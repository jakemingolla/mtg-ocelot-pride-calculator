import type { PositiveInteger } from "./positive-integer";

export enum TokenType {
  CREATURE = "creature",
  NON_CREATURE = "non-creature",
}

export type Token = {
  name: string;
  count: PositiveInteger;
  type: TokenType;
};
