/**
 * Atom: Color Tokens
 *
 * Usage: this file is the single documented source of truth for the
 * palette (mirrored into tailwind.config.ts so utility classes like
 * `bg-heritage-500` stay in sync). `ColorSwatch` renders one token for
 * the /design-system style-guide page — it is not used in product UI.
 */

export const colorTokens = [
  { name: "Heritage Red 500", token: "heritage-500", hex: "#B23A2B", role: "Primary brand / CTA" },
  { name: "Heritage Red 700", token: "heritage-700", hex: "#7A2118", role: "Hover / pressed state" },
  { name: "Gold 500", token: "gold-500", hex: "#C79A3E", role: "Accent, highlights" },
  { name: "Sand 100", token: "sand-100", hex: "#F5ECDB", role: "Page background" },
  { name: "Ink 900", token: "ink-900", hex: "#1C1512", role: "Primary text" },
] as const;

export function ColorSwatch({ hex, name, token }: { hex: string; name: string; token: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-10 w-10 shrink-0 rounded-lg border border-black/10"
        style={{ backgroundColor: hex }}
        aria-hidden="true"
      />
      <div className="text-sm">
        <p className="font-semibold text-ink-900">{name}</p>
        <p className="text-ink-800/70">
          {token} &middot; {hex}
        </p>
      </div>
    </div>
  );
}
