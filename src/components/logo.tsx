import { useId } from "react";
import { arch, badge, clipPath, tagline } from "./logo-art";

type Tone = "light" | "dark";

// Light: cream artwork for green backgrounds. Dark: green artwork for cream backgrounds.
const tones: Record<Tone, { color: string; bg: string }> = {
  light: { color: "#f0e7cc", bg: "#2d5b3d" },
  dark: { color: "#2d5b3d", bg: "#f6f1e1" },
};

function useArt(markup: string) {
  const id = "pp" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return markup.replaceAll("__ID__", id);
}

/** The round badge on its own (no lettering). `bg` must match whatever sits behind it. */
export function LogoMark({ tone = "dark", bg, className }: { tone?: Tone; bg?: string; className?: string }) {
  const t = tones[tone];
  const html = useArt(`<defs>${clipPath}</defs>${badge}`);
  return (
    <svg
      viewBox="84 84 232 232"
      className={className}
      aria-hidden="true"
      style={{ color: t.color, ["--logo-bg" as string]: bg ?? t.bg }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Full badge: arched name, illustration and tagline. */
export function LogoBadge({ tone = "light", bg, className }: { tone?: Tone; bg?: string; className?: string }) {
  const t = tones[tone];
  const html = useArt(`<defs>${clipPath}</defs>${arch}${badge}<path fill="currentColor" d="${tagline}"/>`);
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Pitch & Pedal Hire — Campsite Bicycle Hire"
      style={{ color: t.color, ["--logo-bg" as string]: bg ?? t.bg }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Header/footer lockup: badge mark plus wordmark. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark tone={light ? "light" : "dark"} bg={light ? "#13261a" : undefined} className="h-10 w-10" />
      <span className={`font-display text-xl leading-none ${light ? "text-sand" : "text-forest-700"}`}>
        Pitch &amp; Pedal
      </span>
    </span>
  );
}
