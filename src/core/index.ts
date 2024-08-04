import type { PositiveInteger } from "../types/positive-integer";
import { type Token, TokenType } from "../types/tokens";

const CITYS_BLESSING = 10;

const createTokensFromOcelotPrides = (
  currentOcelot: PositiveInteger,
  totalOcelots: PositiveInteger,
  totalGuides: PositiveInteger,
  createdTokens: Token[],
  // TODO note about avoiding double count
  additionalPermanents: PositiveInteger,
  steps: string[],
): { tokens: Token[]; steps: string[] } => {
  // make note about 1-indexed
  if (currentOcelot > totalOcelots) {
    return { tokens: createdTokens, steps };
  }

  steps.push(`Creating cat token for Ocelot Pride number ${currentOcelot}.`);
  createdTokens.find((token) => token.name === "cat-token")!.count += 1;

  const totalPermanents =
    totalOcelots +
    totalGuides +
    additionalPermanents +
    createdTokens.reduce((acc, token) => acc + token.count, 0);

  if (totalPermanents >= CITYS_BLESSING) {
    steps.push(
      `City's blessing has been achieved with ${totalPermanents} total permanents.`,
    );
    createdTokens
      .filter((token) => token.count > 0)
      .forEach((token) => {
        steps.push(
          `Doubling ${token.name} from ${token.count} to ${token.count * 2}`,
        );
        token.count *= 2;
      });
  } else {
    steps.push(
      `City's blessing has not been achieved with ${totalPermanents} total permanents.`,
    );
  }

  return createTokensFromOcelotPrides(
    currentOcelot + 1,
    totalOcelots,
    totalGuides,
    createdTokens,
    additionalPermanents,
    steps,
  );
};

export const calculate = (
  ocelots: PositiveInteger,
  guides: PositiveInteger,
  totalPermanents: PositiveInteger,
  tokensCreatedThisTurn: Token[] = [],
): {
  energy: PositiveInteger;
  tokens: Token[];
  steps: string[];
} => {
  const catToken = tokensCreatedThisTurn.find(
    (token) => token.name === "cat-token",
  );
  if (!catToken) {
    tokensCreatedThisTurn.push({
      name: "cat-token",
      count: 0,
      type: TokenType.CREATURE,
    });
  }

  const additionalPermanents =
    totalPermanents -
    ocelots -
    guides -
    tokensCreatedThisTurn.reduce((acc, token) => acc + token.count, 0);

  const { tokens, steps } = createTokensFromOcelotPrides(
    1,
    ocelots,
    guides,
    tokensCreatedThisTurn,
    additionalPermanents,
    [],
  );

  const creatureTokens = tokens
    .filter((token) => token.type === TokenType.CREATURE)
    .reduce((acc, token) => acc + token.count, 0);

  const energy = creatureTokens * guides;
  steps.push(`There are ${guides} total Guide of Souls in play.`);
  steps.push(
    `There were ${creatureTokens} total creature tokens created, resulting in ${energy} energy.`,
  );

  return {
    energy,
    tokens,
    steps,
  };
};
