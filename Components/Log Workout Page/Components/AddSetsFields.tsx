import React from "react";

function AddSetsFields({ handleAddSet, values, handleSetChange }) {
  return (
    <div className="mt-4 flex flex-col">
      <div className="flex justify-between">
        <label className="block text-lg font-medium">Sets</label>
        <div>
          <button
            type="button"
            onClick={handleAddSet}
            className="self-end ml-2 px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
          >
            Add Set
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {values.sets.map((set, index) => (
          <div
            key={set.setId}
            className="grid grid-cols-3 gap-2 text-center border mt-4"
          >
            <div className="flex items-center justify-center w-100 text-center">
              <span className="text-sm md:text-lg  font-medium">
                {set.setId}
              </span>
            </div>

            <div>
              <label
                htmlFor={`set-${set.setId}-weight`}
                className="block text-gray-700 font-medium text-sm md:text-lg"
              >
                Weight
              </label>
              <input
                type="number"
                name={`set-${set.setId}-weight`}
                id={`set-${set.setId}-weight`}
                value={set.weight}
                maxLength={4}
                onChange={(e) =>
                  handleSetChange(index, "weight", e.target.valueAsNumber)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200
                  focus:ring-opacity-50 text-center"
              />
            </div>
            <div>
              <label
                htmlFor={`set-${set.setId}-repetitions`}
                className="block text-gray-700 font-medium text-sm md:text-lg"
              >
                Repetitions
              </label>
              <input
                type="number"
                name={`set-${set.setId}-repetitions`}
                id={`set-${set.setId}-repetitions`}
                value={set.repetitions}
                onChange={(e) =>
                  handleSetChange(index, "repetitions", e.target.valueAsNumber)
                }
                className="text-center mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddSetsFields;
