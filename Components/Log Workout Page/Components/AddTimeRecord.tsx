import React from "react";

function AddTimeRecord({ values, handleTimeChange }) {
  return (
    <div className="mt-4 flex flex-col ">
      <label className="block text-lg font-medium">
        How long was your session in Minutes?
      </label>
      <input
        maxLength={4}
        type="number"
        onChange={(e) => handleTimeChange(e)}
        value={values?.time || 0}
      />
      <div className="space-y-2"></div>
    </div>
  );
}

export default AddTimeRecord;
