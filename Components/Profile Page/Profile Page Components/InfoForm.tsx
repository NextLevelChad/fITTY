import Image from "next/image";
import React, { useState } from "react";

function InfoForm() {
  const [weightIsEditing, setWeightIsEditing] = useState(false);

  const handleCurrentWeightEdit = (e) => {
    e.preventDefault();
    setWeightIsEditing(true);
  };

  return (
    <form>
      <div className="mb-6 text-center">
        <label
          htmlFor="current-weight-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Current Weight
        </label>
        <div className="flex no-wrap">
          {weightIsEditing && (
            <input
              type="number"
              id="current-weight-input"
              className="text-center mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          )}
          {!weightIsEditing && (
            <span className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              340
            </span>
          )}
          <button onClick={(e) => handleCurrentWeightEdit(e)}>
            <Image
              src="/assets/svgs/edit.svg"
              alt="edit current weight"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>
    </form>
  );
}

export default InfoForm;
