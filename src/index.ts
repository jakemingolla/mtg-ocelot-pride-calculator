import type { PositiveInteger } from "./types/positive-integer";

const CITYS_BLESSING = 10;

const createTokensFromOcelotPrides = (
  remainingOcelots: PositiveInteger,
  createdTokens: PositiveInteger,
  startingPermaments: PositiveInteger,
  ocelotsCreateTokens: boolean,
): PositiveInteger => {
  if (remainingOcelots === 0) {
    return createdTokens;
  }

  if (ocelotsCreateTokens) {
    createdTokens += 1;
  }

  if (startingPermaments + createdTokens >= CITYS_BLESSING) {
    createdTokens += createdTokens;
  }

  return createTokensFromOcelotPrides(
    remainingOcelots - 1,
    createdTokens,
    startingPermaments,
    ocelotsCreateTokens,
  );
};

export const calculate = (
  ocelots: PositiveInteger,
  guides: PositiveInteger,
  permanents: PositiveInteger,
  treasureTokens: PositiveInteger = 0,
): {
  catTokens: PositiveInteger;
  energy: PositiveInteger;
  treasureTokens: PositiveInteger;
} => {
  const catTokens = createTokensFromOcelotPrides(ocelots, 0, permanents, true);
  treasureTokens = createTokensFromOcelotPrides(
    ocelots,
    treasureTokens,
    permanents,
    false,
  );
  const energy = guides * catTokens;

  return { catTokens, energy, treasureTokens };
};
