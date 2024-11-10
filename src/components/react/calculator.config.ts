import type { CalculatorState } from "./calculator.types";

export const BUTTON_VALUES = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
] as const;

export const ZERO_DIVISION_ERROR_MESSAGE = "Can't divide with 0";

export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  sign: undefined,
  value: 0,
  result: 0,
} as const;
