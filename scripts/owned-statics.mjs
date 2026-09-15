export const ALWAYS_OWNED_STATICS = Object.freeze(["font-sans"]);

export function validateOwnStatics(name, brand, staticRoles) {
  const own = brand._ownStatics;
  if (own === undefined) return;
  if (!Array.isArray(own)) throw new Error(`${name}: _ownStatics должен быть массивом имён ролей`);
  const unknown = own.filter((role) => !staticRoles.includes(role));
  if (unknown.length > 0) {
    throw new Error(`${name}: _ownStatics называет роли вне контракта: ${unknown.join(", ")}`);
  }
}

export function ownedStatics(brand) {
  return new Set([...ALWAYS_OWNED_STATICS, ...(brand._ownStatics ?? [])]);
}
