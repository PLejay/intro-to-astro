import type { StoredCalculation } from "../../calculatorStore";
import { DEFAULT_CALCULATOR_STATE } from "./calculator.config";
import type {
  CalculatorAction,
  CalculatorState,
  Sign,
} from "./calculator.types";

export const removeSpaces = (value: number | string) =>
  Number(value.toString().replace(/\s/g, ""));

export const calculateResult = (
  currentResult: number,
  newValue: number,
  sign: Sign,
) => {
  switch (sign) {
    case "+":
      return currentResult + newValue;
    case "-":
      return currentResult - newValue;
    case "X":
      return currentResult * newValue;
    case "/": {
      if (newValue === 0) throw new Error("Can't divide by 0 oO");
      const result = currentResult / newValue;
      return Math.round(result * 100) / 100;
    }
  }
};

/** State getters for various button clicks */

const getStateOnInvertClick = (state: CalculatorState): CalculatorState => {
  const { value, result } = state;
  return {
    ...state,
    value: value ? value * -1 : undefined,
    result: (result ?? 0) * -1,
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
  if (value === undefined || result === undefined || !sign) return state;
  if (value.toString() === "0" && sign === "/")
    return {
      ...DEFAULT_CALCULATOR_STATE,
      errorMessage: "Can't divide with 0",
    };
  return {
    ...DEFAULT_CALCULATOR_STATE,
    result: calculateResult(result, value, sign),
  };
};

const getStateOnSignClick = (
  state: CalculatorState,
  sign: Sign,
): CalculatorState => {
  const { value, result } = state;
  console.log("🚀 ~ result:", result);
  console.log("🚀 ~ value:", value);

  const getNewResult = () => {
    if (value === undefined) return result;
    if (result === undefined) return value;
    return calculateResult(result, value, sign);
  };

  return {
    ...state,
    sign,
    value: 0,
    result: getNewResult(),
  };
};

// TODO: fix/implement this
const getStateOnCommaClick = (state: CalculatorState): CalculatorState => ({
  ...state,
  // value: state.value.toString().includes(".") ? state.value : state.value + ".",
});

const getStateOnNumClick = (
  state: CalculatorState,
  num: number,
): CalculatorState => {
  const { value, sign, result } = state;
  if (value && value.toString().length >= 16) return state;

  return {
    ...state,
    // TODO: fix this to account for decimals
    value: value !== undefined ? value * 10 + num : num,
    result: sign ? result : undefined,
  };
};

/** Reducer */

export const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction,
  updateStoredCalculations: (calculation: StoredCalculation) => void,
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
        case "=": {
          const newState = getStateOnEqualClick(state);
          console.log("🚀 ~ newState:", newState);
          if (
            state.result !== undefined &&
            state.value !== undefined &&
            state.sign &&
            newState.result !== undefined
          ) {
            updateStoredCalculations({
              firstNumber: state.result,
              secondNumber: state.value,
              operator: state.sign,
              result: newState.result,
            });
          }
          return newState;
        }
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
