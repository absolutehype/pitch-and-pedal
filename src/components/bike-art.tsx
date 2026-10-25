import type { Bike } from "@/lib/data";

/** A simple line-drawn bike, tinted per model, used in place of product photography. */
export function BikeArt({ bike, className }: { bike: Bike; className?: string }) {
  const small = bike.type === "kids";
  const long = bike.type === "tandem" || bike.type === "cargo";
  const r = small ? 15 : 22;
  const rearX = 40;
  const frontX = long ? 190 : 150;
  const y = 90;
  const seatX = rearX + 34;
  const headX = frontX - 26;
  const top = small ? 58 : 46;

  return (
    <svg viewBox="0 0 230 125" className={className} role="img" aria-label={`${bike.name} illustration`}>
      <ellipse cx="115" cy="116" rx="95" ry="5" fill="#1c3926" opacity="0.08" />
      <g fill="none" stroke="#1c3926" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={rearX} cy={y} r={r} />
        <circle cx={frontX} cy={y} r={r} />
      </g>
      <g fill="none" stroke={bike.colour} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* chain stay, seat tube, down tube, top tube, fork */}
        <path d={`M${rearX} ${y} L${seatX + 14} ${y} L${seatX} ${top} Z`} />
        <path d={`M${seatX + 14} ${y} L${headX} ${top + 4} L${frontX} ${y}`} />
        <path d={`M${seatX} ${top} L${headX} ${top + 4}`} />
        {long && <path d={`M${seatX + 50} ${top + 2} L${seatX + 62} ${y}`} />}
        {bike.type === "cargo" && <path d={`M${seatX + 14} ${y - 12} H${headX - 6}`} strokeWidth="9" />}
      </g>
      <g stroke="#1c3926" strokeWidth="5" strokeLinecap="round">
        <path d={`M${seatX - 8} ${top - 8} H${seatX + 8}`} />
        {bike.type === "tandem" && <path d={`M${seatX + 42} ${top - 6} H${seatX + 58}`} />}
        <path d={`M${headX} ${top + 4} L${headX - 4} ${top - 10} H${headX + 12}`} fill="none" />
      </g>
      {bike.type === "e-bike" && <rect x={seatX + 18} y={top + 18} width="26" height="10" rx="4" fill="#1c3926" transform={`rotate(-38 ${seatX + 31} ${top + 23})`} />}
      <circle cx={seatX + 14} cy={y} r="5" fill="#1c3926" />
    </svg>
  );
}
