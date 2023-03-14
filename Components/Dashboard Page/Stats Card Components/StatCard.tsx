import React from "react";
import { textColor, bgColor, borderColor } from "../../../lib/themeColor";

function StatCard({ text, stat, symbol, themeColor }) {
  return (
    <div
      className={`${borderColor[themeColor]} border flex flex-col items-center justify-between sm:p-4 sm:w-32 sm:h-32 rounded`}
    >
      <span>{stat.toUpperCase()}</span>
      <span>{text}</span>
      <div className="h-14 w-7">
        <img src={symbol} alt={stat} />
      </div>
    </div>
  );
}

export default StatCard;
