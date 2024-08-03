import type { PositiveInteger } from "./types/positive-integer";

const CITYS_BLESSING = 10;

const createTokensFromOcelotPrides = (
  remainingOcelots: PositiveInteger,
  createdCats: PositiveInteger,
  startingPermaments: PositiveInteger,
): PositiveInteger => {
  if (remainingOcelots === 0) {
    return createdCats;
  }

  createdCats += 1;

  if (startingPermaments + createdCats >= CITYS_BLESSING) {
    createdCats += createdCats;
  }

  return createTokensFromOcelotPrides(
    remainingOcelots - 1,
    createdCats,
    startingPermaments,
  );
};

export const calculate = (
  ocelots: PositiveInteger,
  guides: PositiveInteger,
  permanents: PositiveInteger,
): { catTokens: PositiveInteger; energy: PositiveInteger } => {
  const catTokens = createTokensFromOcelotPrides(ocelots, 0, permanents);
  const energy = guides * catTokens;

  return { catTokens, energy };
};
