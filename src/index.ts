import type { PositiveInteger } from "./types/positive-integer";

const CITYS_BLESSING = 10;
type Token = string;
const CAT_TOKEN: Token = "cat-token";

const createTokensFromOcelotPrides = (
  remainingOcelots: PositiveInteger,
  createdTokens: Record<Token, PositiveInteger>,
  startingPermaments: PositiveInteger,
): Record<Token, PositiveInteger> => {
  if (remainingOcelots === 0) {
    return createdTokens;
  }

  console.log(`Creating ${CAT_TOKEN}`);
  createdTokens[CAT_TOKEN] += 1;

  const totalPermanents =
    startingPermaments +
    Object.values(createdTokens).reduce((acc, count) => acc + count, 0);

  console.log(`There are ${totalPermanents} permanents.`);

  if (totalPermanents >= CITYS_BLESSING) {
    Object.entries(createdTokens).forEach(([token, count]) => {
      console.log(`Doubling ${token} from ${count} to ${count * 2}`);
      createdTokens[token] = count * 2;
    });
  }

  return createTokensFromOcelotPrides(
    remainingOcelots - 1,
    createdTokens,
    startingPermaments,
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
  const createdTokens = {
    [CAT_TOKEN]: 0,
    "treasure-token": treasureTokens,
  };
  const resultingTokens = createTokensFromOcelotPrides(
    ocelots,
    createdTokens,
    permanents,
  );

  // TODO handle noncreate tokens
  const energy = guides * resultingTokens[CAT_TOKEN];

  return {
    catTokens: resultingTokens[CAT_TOKEN],
    energy,
    treasureTokens: resultingTokens["treasure-token"],
  };
};
