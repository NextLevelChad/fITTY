import React from "react";

function TitleBadge(props) {
  return (
    <div className="absolute -left-4 -top-4 flex justify-center items-center rounded-xl w-56 h-10 rounded text-center text-base text-green-badge-text bg-green-badge-fill border-2 border-green-badge-border  ">
      <span>{props.text}</span>
    </div>
  );
}

export default TitleBadge;
