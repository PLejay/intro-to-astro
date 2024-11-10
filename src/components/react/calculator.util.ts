import { DEFAULT_CALCULATOR_STATE } from "./calculator.config";
import type {
  CalculatorAction,
  CalculatorState,
  Sign,
} from "./calculator.types";

export const numToLocaleString = (num: number): string =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

export const removeSpaces = (value: number | string) =>
  Number(value.toString().replace(/\s/g, ""));

export const calculateResult = (
  currentResult: number | string,
  newValue: number | string,
  sign: Sign,
) => {
  const [formattedCurrentResult, formattedNewValue] = [
    Number(removeSpaces(currentResult)),
    Number(removeSpaces(newValue)),
  ];

  switch (sign) {
    case "+":
      return formattedCurrentResult + formattedNewValue;
    case "-":
      return formattedCurrentResult - formattedNewValue;
    case "X":
      return formattedCurrentResult * formattedNewValue;
    case "/":
      return formattedCurrentResult / formattedNewValue;
  }
};

/** State getters for various button clicks */

const getStateOnInvertClick = (state: CalculatorState): CalculatorState => {
  const { value, result } = state;
  return {
    ...state,
    value: value ? numToLocaleString(removeSpaces(value) * -1) : 0,
    result: result ? numToLocaleString(removeSpaces(result) * -1) : 0,
    sign: undefined,
  };
};

const getStateOnPercentageClick = (state: CalculatorState): CalculatorState => {
  const { value, result } = state;
  const newValue = value ? parseFloat(removeSpaces(value).toString()) : 0;
  const newResult = result ? parseFloat(removeSpaces(result).toString()) : 0;
  return {
    ...state,
    value: newValue / Math.pow(100, 1),
    result: newResult / Math.pow(100, 1),
    sign: undefined,
  };
};

const getStateOnEqualClick = (state: CalculatorState): CalculatorState => {
  const { value, result, sign } = state;
  if (value === undefined || !sign) return state;
  if (value.toString() === "0" && sign === "/")
    return {
      ...DEFAULT_CALCULATOR_STATE,
      errorMessage: "Can't divide with 0",
    };
  return {
    ...DEFAULT_CALCULATOR_STATE,
    result: numToLocaleString(calculateResult(result, value, sign)),
  };
};

const getStateOnSignClick = (
  state: CalculatorState,
  sign: Sign,
): CalculatorState => {
  const { value, result } = state;

  const getNewResult = () => {
    if (value === undefined) return result;
    if (result === undefined) return value;
    return numToLocaleString(calculateResult(result, value, sign));
  };
  return {
    ...state,
    sign,
    value: 0,
    result: getNewResult(),
  };
};

const getStateOnCommaClick = (state: CalculatorState): CalculatorState => ({
  ...state,
  value: state.value.toString().includes(".") ? state.value : state.value + ".",
});

const getStateOnNumClick = (
  state: CalculatorState,
  num: number,
): CalculatorState => {
  const { value, sign, result } = state;
  if (removeSpaces(value).toString().length >= 16) return state;

  return {
    ...state,
    value:
      removeSpaces(value) % 1 === 0 && !value.toString().includes(".")
        ? numToLocaleString(Number(removeSpaces(value) + num))
        : numToLocaleString(Number(value) + num),
    result: sign ? result : 0,
  };
};

/** Reducer */

export const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState => {
  switch (action.type) {
    case "RESET":
      return DEFAULT_CALCULATOR_STATE;
    case "BUTTON_CLICK": {
      switch (action.value) {
        case "C":
          return DEFAULT_CALCULATOR_STATE;
        case "+-":
          return getStateOnInvertClick(state);
        case "%":
          return getStateOnPercentageClick(state);
        case "=":
          return getStateOnEqualClick(state);
        case "/":
        case "X":
        case "-":
        case "+":
          return getStateOnSignClick(state, action.value);
        case ".":
          return getStateOnCommaClick(state);
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          return getStateOnNumClick(state, action.value);
      }
    }
  }
};
