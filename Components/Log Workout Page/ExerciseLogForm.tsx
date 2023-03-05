import React, { useState } from "react";
import { Set } from "../../types/set";
import { FormValues } from "../../types/FormValues";
import { LogType } from "../../types/LogType";
import { ExerciseTypes } from "../../types/exerciseTypes";
import { exercises } from "../../lib/exercises";
import { useSession } from "next-auth/react";

//trpc imports
import { trpc } from "../../utils/trpc";

//Form Components
import AddSetsFields from "./Components/AddSetsFields";
import AddPersonalRecord from "./Components/AddPersonalRecord";
import AddTimeRecord from "./Components/AddTimeRecord";

export default function ExerciseLogForm() {
  const [values, setValues] = useState<FormValues>({
    exerciseType: "Strength",
    exercise: null,
    logType: "Sets",
    sets: [],
    personalRecord: null,
    time: 0,
  });

  const { data: session } = useSession();
  const submitForm = trpc.logExercise.submitLog.useMutation();

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selected = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      exercise: selected,
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selected = parseInt(e.target.value);
    setValues((prevValues) => ({
      ...prevValues,
      time: selected,
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

  const handleTypeOfExerciseChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const exerciseType = e.target.value as ExerciseTypes;
    setValues((prevValues) => ({ ...prevValues, exerciseType: exerciseType }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("We submitted the form", e);

    if (values.logType === "Sets") {
      await submitForm.mutate({
        userEmail: session.user.email,
        exerciseName: values.exercise,
        logType: values.logType,
        sets: values.sets,
        exerciseType: values.exerciseType,
        time: values.time,
      });
    } else if (values.logType === "Personal Record") {
      await submitForm.mutate({
        userEmail: session.user.email,
        exerciseName: values.exercise,
        logType: values.logType,
        personalRecord: values.personalRecord,
        exerciseType: values.exerciseType,
        time: values.time,
      });
    } else if (values.logType === "Time") {
      await submitForm.mutate({
        userEmail: session.user.email,
        exerciseName: values.exercise,
        logType: values.logType,
        time: values.time,
        exerciseType: values.exerciseType,
      });
    }

    setValues({
      exercise: null,
      logType: "Sets",
      sets: [],
      personalRecord: null,
      exerciseType: "Strength",
      time: 0,
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-4 mx-auto max-w-screen-lg"
    >
      <h2 className="text-2xl font-bold">Add Exercise Log</h2>
      <div className="mt-4">
        <label htmlFor="logType" className="block text-lg font-medium">
          Type of Exercise
        </label>
        <select
          name="typeOfExercise"
          id="typeOfExercise"
          onChange={(e) => handleTypeOfExerciseChange(e)}
          value={values.exerciseType}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="Strength">Strength</option>
          <option value="Endurance">Endurance</option>
          <option value="Balance">Balance</option>
          <option value="Flexibility">Flexibility</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="exercise" className="block text-lg font-medium">
          Exercise Name
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
          What type of workout are you logging?
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
          <option value="Time">Time</option>
        </select>
      </div>

      {values.logType === "Sets" && (
        <AddSetsFields
          handleAddSet={handleAddSet}
          values={values}
          handleSetChange={handleSetChange}
        />
      )}

      {values.logType === "Personal Record" && (
        <AddPersonalRecord values={values} setValues={setValues} />
      )}

      {values.logType === "Time" && (
        <AddTimeRecord values={values} handleTimeChange={handleTimeChange} />
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
