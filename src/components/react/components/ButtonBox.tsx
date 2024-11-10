import type { PropsWithChildren } from "react";
import "./ButtonBox.css";

const ButtonBox = ({ children }: PropsWithChildren) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;
