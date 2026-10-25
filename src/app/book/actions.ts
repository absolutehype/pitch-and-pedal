"use server";

import { redirect } from "next/navigation";
import { getBike, getCampsite } from "@/lib/data";
import { isISODate, toISODate } from "@/lib/dates";
import { AvailabilityError, createReservation } from "@/lib/reservations";

export type BookingState = {
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "pitch" | "dates" | "quantity", string>>;
  // Echoed back so the form keeps what the rider typed when validation fails.
  values?: Record<"name" | "email" | "phone" | "pitch" | "notes", string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function reserve(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const campsite = get("campsite");
  const bike = get("bike");
  const startDate = get("from");
  const endDate = get("to");
  const quantity = Number(get("quantity"));
  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const pitch = get("pitch");
  const notes = get("notes").slice(0, 500);

  if (!getCampsite(campsite) || !getBike(bike)) {
    return { error: "Something went wrong with that bike or campsite. Please start again." };
  }

  const fieldErrors: BookingState["fieldErrors"] = {};
  const today = toISODate(new Date());
  if (!isISODate(startDate) || !isISODate(endDate) || startDate <= today || endDate <= startDate) {
    fieldErrors.dates = "Choose a delivery date from tomorrow and a later collection date.";
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) fieldErrors.quantity = "Choose between 1 and 10 bikes.";
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 10) fieldErrors.phone = "Please enter a mobile number we can reach you on.";
  if (!pitch) fieldErrors.pitch = "Let us know your pitch number, or 'TBC' if you don't have one yet.";
  const values = { name, email, phone, pitch, notes };
  if (Object.keys(fieldErrors).length) return { fieldErrors, values };

  let token: string;
  try {
    const reservation = await createReservation({
      campsite,
      bike,
      quantity,
      startDate,
      endDate,
      name,
      email,
      phone,
      pitch,
      notes,
    });
    token = reservation.token;
  } catch (err) {
    if (err instanceof AvailabilityError) return { error: err.message, values };
    throw err;
  }

  redirect(`/book/confirmation/${token}`);
}
