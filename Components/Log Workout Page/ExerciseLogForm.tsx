import React, { useState } from "react";
import { Set } from "../../types/set";
import { FormValues } from "../../types/FormValues";
import { LogType } from "../../types/LogType";
import exercises from "../../lib/exercises";
import { PersonalRecord } from "../../types/personalRecord";
import { Exercise } from "../../types/exercise";
import {useSession} from "next-auth/react";

//trpc imports
import { trpc } from "../../utils/trpc";

export default function ExerciseLogForm() {
  const [values, setValues] = useState<FormValues>({
    exercise: null,
    logType: "Sets",
    sets: [],
    personalRecord: null,
  });

  const {data: session} = useSession();
  const submitForm = trpc.logExercise.submitLog.useMutation();




  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      exercise: selected,
    }));
  };

  const handleLogTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const logType = e.target.value as LogType;
    setValues((prevValues) => ({ ...prevValues, logType }));
  };

  const handleAddSet = () => {
    setValues((prevValues) => ({
      ...prevValues,
      sets: [
        ...prevValues.sets,
        {
          setId: prevValues.sets.length + 1,
          weight: 0,
          repetitions: 0,
        },
      ],
    }));
  };

  const handleSetChange = (index: number, field: keyof Set, value: number) => {
    setValues((prevValues) => {
      const sets = [...prevValues.sets];
      sets[index] = { ...sets[index], [field]: value };
      return { ...prevValues, sets };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.logType === 'Sets') {
        console.log("We got into this function")
        console.log("Values dot sets is set to, ", values.sets)
          await submitForm.mutate({
            userEmail: session.user.email,
            exerciseName: values.exercise, 
            logType: values.logType,
            sets: values.sets
          })
        } else {
          await submitForm.mutate({
            userEmail: session.user.email,
            exerciseName: values.exercise, 
            logType: values.logType,
            personalRecord: values.personalRecord
          })
        }

    setValues({
      exercise: null,
      logType: "Sets",
      sets: [],
      personalRecord: null,
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="p-4 mx-auto max-w-screen-lg">
      <h2 className="text-2xl font-bold">Add Exercise Log</h2>
      <div className="mt-4">
        <label htmlFor="exercise" className="block text-lg font-medium">
          Exercise
        </label>
        <div className="">
          <input
            name="exercise"
            id="exercise"
            onChange={(e) => handleExerciseChange(e)}
            list="exercises"
            value={values.exercise || ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <datalist id="exercises">
            <option value="">Select an exercise</option>
            {exercises?.map((exercise, idx) => (
              <option key={idx} value={exercise.Exercise}>
                {exercise.Exercise}
              </option>
            ))}
          </datalist>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="logType" className="block text-lg font-medium">
          Are you logging sets or a new personal record?
        </label>
        <select
          name="logType"
          id="logType"
          onChange={handleLogTypeChange}
          value={values.logType}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="Sets">Sets</option>
          <option value="Personal Record">Personal Record</option>
        </select>
      </div>

      {values.logType === "Sets" && (
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
                      handleSetChange(
                        index,
                        "repetitions",
                        e.target.valueAsNumber
                      )
                    }
                    className="text-center mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {values.logType === "Personal Record" && (
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
      )}

      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
        >
          Add Log
        </button>
      </div>
    </form>
  );
}
