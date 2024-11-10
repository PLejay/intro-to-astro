import type { BUTTON_VALUES } from "./calculator.config";

export type ButtonValue = (typeof BUTTON_VALUES)[number][number];

export type Sign = "+" | "-" | "X" | "/";

export type CalculatorState = {
  sign: Sign | undefined;
  value: number | undefined;
  result: number | undefined;
  errorMessage?: string;
};

export type CalculatorAction =
  | {
      type: "RESET";
    }
  | { type: "BUTTON_CLICK"; value: ButtonValue };
