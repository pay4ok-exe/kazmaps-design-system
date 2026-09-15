export const ALWAYS_OWNED_STATICS = ["font-sans"];

export function ownedStatics(brand) {
  return new Set([...ALWAYS_OWNED_STATICS, ...(brand._ownStatics ?? [])]);
}
