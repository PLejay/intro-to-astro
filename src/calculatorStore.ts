import { atom } from "nanostores";

export type StoredCalculation = {
  
  firstNumber: number;
  secondNumber: number;
  operator: "+" | "-" | "X" | "/";
  result: number;
};

const mockCalculations: StoredCalculation[] = [
  { firstNumber: 1, secondNumber: 2, operator: "+", result: 3 },
  { firstNumber: 1, secondNumber: 2, operator: "-", result: -1 },
  { firstNumber: 1, secondNumber: 2, operator: "X", result: 2 },
  { firstNumber: 1, secondNumber: 2, operator: "/", result: 0.5 },
];

export const storedCalculations = atom<StoredCalculation[]>([]);
