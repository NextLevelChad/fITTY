import React from "react";

function AddPersonalRecord({ values, setValues }) {
  return (
    <div className="mt-4">
      <label className="block text-lg font-medium">Personal Record</label>
      <div className="space-y-2 flex flex-col justify-center items-center">
        <div className="mt-2 ">
          <label
            htmlFor="personalRecordWeight"
            className="block text-gray-700 font-medium text-center"
          >
            Weight
          </label>
          <input
            type="number"
            name="personalRecordWeight"
            id="personalRecordWeight"
            value={values.personalRecord?.weight || 0}
            onChange={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                personalRecord: {
                  ...prevValues.personalRecord,
                  weight: e.target.valueAsNumber,
                },
              }))
            }
            className="text-center mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
}

export default AddPersonalRecord;
