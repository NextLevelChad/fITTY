import React from "react";
import Image from "next/image";
import Link from "next/link";

function ExerciseBar(props) {
  return (
    <div className="m-h-10 flex sm:justify-center items-center border rounded rounded-xl p-2 shadow-dashboard-card flex-wrap mt-4 justify-center ">
      <div className="grow-1 flex flex-col justify-center items-center text-center mb-2 sm:mb:0">
        <span className="text-xs md:text-sm mr-2 text-center">
          {props.exerciseName}
        </span>
        <span>{props.weight}lbs</span>
      </div>
      <div className="flex justify-center items-center flex-nowrap gap-2">
        <div className="flex flex-col justify-end items-center text-center">
          <Image
            src={`/assets/svgs/${props.type}.svg`}
            alt={`Exercise Type Logo ${props.type}`}
            width="25"
            height="25"
          />
          <span>Exercise Type</span>
        </div>
        <div className="border-l border-dashed  w-2 h-4 basis-1 border-gray-400 m-0 p-0 shrink" />
        <div className="flex flex-col justify-center items-center text-center">
          <Link
            href={`/dashboard/charts/${props.logType}/${props.exerciseName}`}
          >
            <Image
              src="/assets/svgs/chart.svg"
              alt="Chart button"
              height="25"
              width="25"
            />
          </Link>
          <span>Chart</span>
        </div>
        <div className="border-l border-dashed  w-2 h-4 basis-1 border-gray-400 m-0 p-0 shrink" />
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            src="/assets/svgs/edit.svg"
            alt="Edit button"
            height="25"
            width="25"
          />
          <span>Edit Record</span>
        </div>
      </div>
    </div>
  );
}

export default ExerciseBar;
