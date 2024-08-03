export type CreatureToken = string;
export type NonCreatureToken = string;
export type Token = CreatureToken | NonCreatureToken;

type TypePred<T, U> = Extract<0 extends 1 & T ? U : T extends U ? T : T & U, T>;

declare function isCreatureToken<T>(x: T): x is TypePred<T, CreatureToken>;
