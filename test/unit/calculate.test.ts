import { calculate } from "../../src";
import { TokenType, type Token } from "../../src/types/tokens";
import type { PositiveInteger } from "../../src/types/positive-integer";

const calculateWithOnly = (
  ocelots: PositiveInteger,
  guides: PositiveInteger,
  treasureTokens: PositiveInteger = 0,
) => {
  return calculate(ocelots, guides, ocelots + guides + treasureTokens, [
    {
      name: "treasure-token",
      count: treasureTokens,
      type: TokenType.NON_CREATURE,
    },
  ]);
};

const calculateWithCitysBlessing = (
  ocelots: PositiveInteger,
  guides: PositiveInteger,
  treasureTokens: PositiveInteger = 0,
) => {
  return calculate(ocelots, guides, 10, [
    {
      name: "treasure-token",
      count: treasureTokens,
      type: TokenType.NON_CREATURE,
    },
  ]);
};

const expectCatTokens = (tokens: Token[], expected: PositiveInteger) => {
  expect(tokens.find((token) => token.name === "cat-token")!.count).toBe(
    expected,
  );
};

const expectTreasueTokens = (tokens: Token[], expected: PositiveInteger) => {
  expect(tokens.find((token) => token.name === "treasure-token")!.count).toBe(
    expected,
  );
};

const zeroGuides = 0;

describe("calculate", () => {
  describe("only ocelots", () => {
    it("should return zero if given none", () => {
      const ocelots = 0;
      const result = calculateWithOnly(ocelots, zeroGuides);

      expectCatTokens(result.tokens, 0);
    });

    it("should return 1 if given one ocelot without citys blessing", () => {
      const ocelots = 1;
      const result = calculateWithOnly(ocelots, zeroGuides);

      expectCatTokens(result.tokens, 1);
    });

    it("should return 2 if given one ocelot with citys blessing", () => {
      const ocelots = 1;
      const result = calculateWithCitysBlessing(ocelots, zeroGuides);

      expectCatTokens(result.tokens, 2);
    });

    it("should return 126 if given six ocelots with citys blessing", () => {
      const ocelots = 6;
      const result = calculateWithCitysBlessing(ocelots, zeroGuides);

      expectCatTokens(result.tokens, 126);
    });

    it("should handle up to thirty ocelots", () => {
      const ocelots = 30;
      const result = calculateWithCitysBlessing(ocelots, zeroGuides);

      // Judge!
      expectCatTokens(result.tokens, 2147483646);
    });

    it("should only double once citys blessing is reached", () => {
      const ocelots = 2;
      const guides = 0;
      const permanents = 8;
      const result = calculate(ocelots, guides, permanents, []);

      expectCatTokens(result.tokens, 4);
    });
  });

  describe("with guides", () => {
    it("should return zero energy if given no guides", () => {
      const ocelots = 1;
      const guides = 0;
      const result = calculateWithOnly(ocelots, guides);

      expect(result.energy).toBe(0);
    });

    it("should return zero energy if given no guides and citys blessing", () => {
      const ocelots = 1;
      const guides = 0;
      const result = calculateWithCitysBlessing(ocelots, guides);

      expect(result.energy).toBe(0);
    });

    it("should correctly calculate with one guide and one ocelot", () => {
      const ocelots = 1;
      const guides = 1;
      const result = calculateWithOnly(ocelots, guides);

      expect(result.energy).toBe(1);
    });

    it("should correctly calculate with one guide and one ocelot and citys blessing", () => {
      const ocelots = 1;
      const guides = 1;
      const result = calculateWithCitysBlessing(ocelots, guides);

      expect(result.energy).toBe(2);
    });

    it("should correctly calculate with two guides and two ocelots", () => {
      const ocelots = 2;
      const guides = 2;
      const result = calculateWithOnly(ocelots, guides);

      expect(result.energy).toBe(4);
    });

    it("should correctly calculate with two guides and two ocelots and citys blessing", () => {
      const ocelots = 2;
      const guides = 2;
      const result = calculateWithCitysBlessing(ocelots, guides);

      expect(result.energy).toBe(12);
    });

    it("should handle 6 ocelots and 6 guides", () => {
      const ocelots = 6;
      const guides = 6;
      const result = calculateWithCitysBlessing(ocelots, guides);

      expect(result.energy).toBe(126 * 6);
    });

    it("should not count noncreature tokens", () => {
      const ocelots = 1;
      const guides = 1;
      const treasureTokens = 1;
      const result = calculateWithOnly(ocelots, guides, treasureTokens);

      expect(result.energy).toBe(1);
    });

    it("should not count noncreature tokens with the cits blessing", () => {
      const ocelots = 1;
      const guides = 1;
      const treasureTokens = 1;
      const result = calculateWithCitysBlessing(
        ocelots,
        guides,
        treasureTokens,
      );

      expect(result.energy).toBe(2);
    });
  });

  describe("with additional tokens", () => {
    it("does not add tokens without the citys blessing", () => {
      const ocelots = 2;
      const treasureTokens = 2;
      const result = calculateWithOnly(ocelots, zeroGuides, treasureTokens);
      expectTreasueTokens(result.tokens, 2);
    });

    it("doubles tokens with the citys blessing", () => {
      const ocelots = 2;
      const treasureTokens = 2;
      const result = calculateWithCitysBlessing(
        ocelots,
        zeroGuides,
        treasureTokens,
      );
      expectTreasueTokens(result.tokens, 8);
    });

    it("only doubles once the citys blessing is reached", () => {
      const ocelots = 2;
      const permanents = 6;
      const treasureTokens = 2;
      const result = calculate(ocelots, zeroGuides, permanents, [
        {
          name: "treasure-token",
          count: treasureTokens,
          type: TokenType.NON_CREATURE,
        },
      ]);

      expectTreasueTokens(result.tokens, 4);
    });
  });

  describe("steps", () => {
    it("includes when the citys blessing is achieved", () => {
      const ocelots = 1;
      const guides = 1;
      const result = calculateWithCitysBlessing(ocelots, guides);

      expect(
        result.steps.some((step) =>
          step.includes("City's blessing has been achieved"),
        ),
      ).toBe(true);
    });

    it("includes when an ocelot creates a cat", () => {
      const ocelots = 1;
      const guides = 1;
      const result = calculateWithCitysBlessing(ocelots, guides);

      expect(result.steps).toContain(
        "Creating cat token for Ocelot Pride number 1.",
      );
    });

    it("includes when a token is doubled", () => {
      const ocelots = 1;
      const guides = 1;
      const result = calculateWithCitysBlessing(ocelots, guides);

      expect(result.steps).toContain("Doubling cat-token from 1 to 2");
    });

    it("does not include tokens with a count of zero", () => {
      const ocelots = 1;
      const guides = 1;
      const treasureTokens = 0;
      const result = calculateWithCitysBlessing(
        ocelots,
        guides,
        treasureTokens,
      );

      expect(result.steps.some((step) => /treasure/i.test(step))).toBe(false);
    });
  });
});
