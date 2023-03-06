import React from "react";

function TitleBadge({ text, themeColor }) {
  return (
    <div
      className={`absolute -left-4 -top-4 flex justify-center items-center rounded-xl w-56 h-10 rounded text-center text-base text-${themeColor}-900 bg-${themeColor}-300 border-2 border-${themeColor}-500`}
    >
      <span>{text}</span>
    </div>
  );
}

export default TitleBadge;
