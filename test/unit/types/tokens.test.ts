import { TokenType, type Token } from "../../../src/types/tokens";

describe("src/types/tokens", () => {
  it("should be able to differentiate different types of tokens", () => {
    const creatureToken: Token = {
      name: "creature-token",
      count: 1,
      type: TokenType.CREATURE,
    };
    const nonCreatureToken: Token = {
      name: "non-creature-token",
      count: 1,
      type: TokenType.NON_CREATURE,
    };
    const input = [creatureToken, nonCreatureToken];
    const output = input.filter((token) => token.type === TokenType.CREATURE);

    expect(output).toEqual([creatureToken]);
  });
});
