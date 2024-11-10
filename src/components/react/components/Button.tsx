import React from "react";
import type { ButtonValue } from "../calculator.types";
import "./Button.css";

type ButtonProps = {
  className: string;
  value: ButtonValue;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ className, value, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
