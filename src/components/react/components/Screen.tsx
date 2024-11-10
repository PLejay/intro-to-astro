import { useEffect, useRef } from "react";
import "./Screen.css";

type ScreenProps = {
  value: number | string;
};

const Screen = ({ value }: ScreenProps) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!textRef.current) return;
      const element = textRef.current;
      let fontSize = 70;

      element.style.fontSize = `${fontSize}px`;

      while (element.scrollWidth > element.clientWidth && fontSize > 1) {
        fontSize--;
        element.style.fontSize = `${fontSize}px`;
      }
    };

    adjustFontSize();
  }, [value]);

  return (
    <div className="screen">
      <p className="responsive-text" ref={textRef}>
        {value}
      </p>
    </div>
  );
};

export default Screen;
