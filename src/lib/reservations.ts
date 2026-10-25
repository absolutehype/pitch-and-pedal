import "server-only";

import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getBike, getCampsite } from "./data";
import { nightsBetween } from "./dates";

export type Reservation = {
  ref: string;
  campsite: string;
  bike: string;
  quantity: number;
  startDate: string; // YYYY-MM-DD, first day of hire
  endDate: string; // YYYY-MM-DD, day the bike is collected
  name: string;
  email: string;
  phone: string;
  pitch: string;
  notes: string;
  total: number;
  createdAt: string;
};

// A JSON file is enough for a demo. Swap this module for a real database
// before taking live bookings: Vercel's filesystem is ephemeral.
const DATA_DIR = process.env.VERCEL ? path.join(os.tmpdir(), "pitch-and-pedal") : path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "reservations.json");

let queue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Reservation[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeAll(list: Reservation[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(list, null, 2));
}

function overlaps(a: { startDate: string; endDate: string }, b: { startDate: string; endDate: string }) {
  return a.startDate < b.endDate && b.startDate < a.endDate;
}

export async function bookedCount(campsite: string, bike: string, startDate: string, endDate: string) {
  const list = await readAll();
  return list
    .filter((r) => r.campsite === campsite && r.bike === bike && overlaps(r, { startDate, endDate }))
    .reduce((sum, r) => sum + r.quantity, 0);
}

export async function availableCount(campsite: string, bike: string, startDate: string, endDate: string) {
  const total = getCampsite(campsite)?.fleet[bike] ?? 0;
  return Math.max(0, total - (await bookedCount(campsite, bike, startDate, endDate)));
}

export async function getReservation(ref: string) {
  const list = await readAll();
  return list.find((r) => r.ref === ref.toUpperCase()) ?? null;
}

export class AvailabilityError extends Error {}

export function createReservation(
  input: Omit<Reservation, "ref" | "total" | "createdAt">,
): Promise<Reservation> {
  // Serialise writes so two simultaneous bookings can't both take the last bike.
  const run = queue.then(async () => {
    const campsite = getCampsite(input.campsite);
    const bike = getBike(input.bike);
    if (!campsite || !bike) throw new AvailabilityError("That bike isn't available at this campsite.");

    const free = await availableCount(input.campsite, input.bike, input.startDate, input.endDate);
    if (free < input.quantity) {
      throw new AvailabilityError(
        free === 0
          ? "Sorry, that bike is fully booked for those dates."
          : `Only ${free} available for those dates.`,
      );
    }

    const days = nightsBetween(input.startDate, input.endDate);
    const reservation: Reservation = {
      ...input,
      ref: "PP-" + randomBytes(3).toString("hex").toUpperCase(),
      total: days * bike.pricePerDay * input.quantity,
      createdAt: new Date().toISOString(),
    };
    const list = await readAll();
    list.push(reservation);
    await writeAll(list);
    return reservation;
  });
  queue = run.catch(() => {});
  return run;
}
