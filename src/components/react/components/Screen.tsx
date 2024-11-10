import { useEffect, useRef } from "react";
import "./Screen.css";

type ScreenProps = {
  value: number | undefined;
};

const Screen = ({ value }: ScreenProps) => {
  const numToLocaleString = (num: number): string =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

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
        {value ? numToLocaleString(value) : 0}
      </p>
    </div>
  );
};

export default Screen;
