import { useReducer, type MouseEvent } from "react";

import { BUTTON_VALUES, DEFAULT_CALCULATOR_STATE } from "./calculator.config";
import type { ButtonValue } from "./calculator.types";
import { calculatorReducer } from "./calculator.util";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import Screen from "./components/Screen";
import Wrapper from "./components/Wrapper";

const Calculator = () => {
  const [calculatorState, dispatchCalculatorState] = useReducer(
    calculatorReducer,
    DEFAULT_CALCULATOR_STATE,
  );

  const resetState = () => {
    dispatchCalculatorState({ type: "RESET" });
  };

  const onButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    value: ButtonValue,
  ) => {
    e.preventDefault();
    if (calculatorState.errorMessage) resetState();

    dispatchCalculatorState({ type: "BUTTON_CLICK", value });
  };

  return (
    <Wrapper>
      <Screen
        value={
          calculatorState.value ? calculatorState.value : calculatorState.result
        }
      />
      <ButtonBox>
        {BUTTON_VALUES.flat().map((value, i) => {
          return (
            <Button
              key={i}
              className={value === "=" ? "equals" : ""}
              value={value}
              onClick={(e) => onButtonClick(e, value)}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default Calculator;
