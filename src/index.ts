import type { PositiveInteger } from "./types/positive-integer";
import { type Token, TokenType } from "./types/tokens";

const CITYS_BLESSING = 10;

const createTokensFromOcelotPrides = (
  remainingOcelots: PositiveInteger,
  createdTokens: Token[],
  startingPermaments: PositiveInteger,
): Token[] => {
  if (remainingOcelots === 0) {
    return createdTokens;
  }

  console.log(`Creating cat token from ocelot pride.`);
  createdTokens.find((token) => token.name === "cat-token")!.count += 1;

  const totalPermanents =
    startingPermaments +
    createdTokens.reduce((acc, token) => acc + token.count, 0);

  console.log(`There are ${totalPermanents} permanents.`);

  if (totalPermanents >= CITYS_BLESSING) {
    createdTokens.forEach((token) => {
      console.log(
        `Doubling ${token.name} from ${token.count} to ${token.count * 2}`,
      );
      token.count *= 2;
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
  tokens: Token[] = [],
): {
  energy: PositiveInteger;
  tokens: Token[];
} => {
  const catToken: Token = {
    name: "cat-token",
    count: 0,
    type: TokenType.CREATURE,
  };

  tokens.unshift(catToken);

  tokens = createTokensFromOcelotPrides(ocelots, tokens, permanents);

  const energy =
    tokens
      .filter((token) => token.type === TokenType.CREATURE)
      .reduce((acc, token) => acc + token.count, 0) * guides;

  return {
    energy,
    tokens,
  };
};
