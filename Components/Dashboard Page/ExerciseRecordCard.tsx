import React from "react";
import Image from "next/image";

function ExerciseBar(props) {
  return (
    <div className="h-10 flex justify-between items-center border rounded rounded-xl p-2 shadow-dashboard-card ">
      <div className="grow-1">
        <span>{props.exerciseName}</span>
      </div>
      <div className="flex justify-center items-center flex-nowrap gap-2">
        <Image
          src={`/assets/svgs/${props.type}.svg`}
          alt={`Exercise Type Logo ${props.type}`}
          width="25"
          height="25"
        />
        <div className="border-l border-dashed  w-2 h-4 basis-1 border-gray-400 m-0 p-0 shrink" />
        <Image
          src="/assets/svgs/chart.svg"
          alt="Chart button"
          height="25"
          width="25"
        />
        <div className="border-l border-dashed  w-2 h-4 basis-1 border-gray-400 m-0 p-0 shrink" />
        <Image
          src="/assets/svgs/edit.svg"
          alt="Edit button"
          height="25"
          width="25"
        />
      </div>
    </div>
  );
}

export default ExerciseBar;
