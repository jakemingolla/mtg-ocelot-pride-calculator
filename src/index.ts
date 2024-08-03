import type { PositiveInteger } from "./types/positive-integer";
import type { CreatureToken, Token } from "./types/tokens";
import { isCreatureToken } from "./types/tokens";

const CITYS_BLESSING = 10;
const CAT_TOKEN: CreatureToken = "cat-token";

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
  tokens: Record<Token, PositiveInteger>,
): {
  energy: PositiveInteger;
  tokens: Record<Token, PositiveInteger>;
} => {
  tokens[CAT_TOKEN] = 0;

  tokens = createTokensFromOcelotPrides(ocelots, tokens, permanents);

  // TODO handle noncreate tokens
  const energy = Object.entries(tokens)
    .filter(([token]) => isCreatureToken(token))
    .reduce((acc, [, count]) => acc + count, 0);

  return {
    energy,
    tokens,
  };
};
