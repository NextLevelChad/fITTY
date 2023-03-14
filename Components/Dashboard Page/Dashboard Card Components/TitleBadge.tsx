import React from "react";
import { textColor, bgColor, borderColor } from "../../../lib/themeColor";

function TitleBadge({ text, themeColor }) {
  return (
    <div
      className={`absolute -left-4 -top-4 flex justify-center items-center rounded-xl w-56 h-10 rounded text-center text-base ${textColor[themeColor]} ${bgColor[themeColor]} border-2 ${borderColor[themeColor]}`}
    >
      <span>{text}</span>
    </div>
  );
}

export default TitleBadge;
