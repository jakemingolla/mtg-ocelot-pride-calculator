import { calculate } from "../../src";
import type { PositiveInteger } from "../../src/types/positive-integer";

const calculateWithOnly = (
  ocelots: PositiveInteger,
  guides: PositiveInteger,
) => {
  return calculate(ocelots, guides, ocelots + guides);
};

const calculateWithCitysBlessing = (
  ocelots: PositiveInteger,
  guides: PositiveInteger,
) => {
  return calculate(ocelots, guides, 10);
};

describe("calculate", () => {
  describe("only ocelots", () => {
    const zeroGuides = 0;
    it("should return zero if given none", () => {
      const ocelots = 0;
      const result = calculateWithOnly(ocelots, zeroGuides);

      expect(result.catTokens).toBe(0);
    });

    it("should return 1 if given one ocelot without citys blessing", () => {
      const ocelots = 1;
      const result = calculateWithOnly(ocelots, zeroGuides);

      expect(result.catTokens).toBe(1);
    });

    it("should return 2 if given one ocelot with citys blessing", () => {
      const ocelots = 1;
      const result = calculateWithCitysBlessing(ocelots, zeroGuides);

      expect(result.catTokens).toBe(2);
    });

    it("should return 126 if given six ocelots with citys blessing", () => {
      const ocelots = 6;
      const result = calculateWithCitysBlessing(ocelots, zeroGuides);

      expect(result.catTokens).toBe(126);
    });

    it("should handle up to thirty ocelots", () => {
      const ocelots = 30;
      const result = calculateWithCitysBlessing(ocelots, zeroGuides);

      // Judge!
      expect(result.catTokens).toBe(2147483646);
    });

    it("should only double once citys blessing is reached", () => {
      const ocelots = 2;
      const guides = 0;
      const permanents = 8;
      const result = calculate(ocelots, guides, permanents);

      expect(result.catTokens).toBe(4);
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
  });
});
