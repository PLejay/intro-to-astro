import { type PropsWithChildren } from "react";
import "./Wrapper.css";

const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
