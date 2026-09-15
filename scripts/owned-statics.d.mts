export declare const ALWAYS_OWNED_STATICS: readonly string[];

export declare function validateOwnStatics(
  name: string,
  brand: { _ownStatics?: unknown },
  staticRoles: readonly string[],
): void;

export declare function ownedStatics(brand: { _ownStatics?: string[] }): Set<string>;
