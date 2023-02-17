import React, { useState } from 'react';
import { Exercise } from '../types/exercise';
import { Set } from '../types/set';
import { PersonalRecord } from '../types/personalRecord';
import { FormValues } from '../types/FormValues';
import { LogType } from '../types/LogType';
// import { createSet, createPersonalRecord } from '../api';
import prisma from '../lib/prisma';
import exercises from '../lib/exercises'


export default function exerciseLogForm () {    
    const [values, setValues] = useState<FormValues>({
        exercise: null,
        logType: 'Sets',
        sets: [],
        personalRecord: null,
      });
    
     
      const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        if (selected === 'custom') {
          setValues((prevValues) => ({
            ...prevValues,
            exercise: { Exercise: selected },
          }));
        } else {
          const exercise = exercises?.find((e) => e.Exercise === selected) || null;
          setValues((prevValues) => ({ ...prevValues, exercise }));
        }
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
    
      const handleSetChange = (index: number, field: keyof Set, value: string) => {
        setValues((prevValues) => {
          const sets = [...prevValues.sets];
          sets[index] = { ...sets[index], [field]: value };
          return { ...prevValues, sets };
        });
      };
    
/*       const handlePersonalRecordChange = (
        field: keyof PersonalRecord,
        value: string
      ) => {
        setValues((prevValues) => {
          const personalRecord = prevValues.personalRecord
            ? { ...prevValues.personalRecord }
            : {
                exercise: prevValues.exercise?.Exercise || '',
                weight: 0,
              };
          personalRecord[field] = value;
          return { ...prevValues, personalRecord };
        });
      }; */
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
/*         if (values.logType === 'Sets') {
          const sets = values.sets.map((set) => ({
            ...set,
            weight: parseInt(set.weight),
            repetitions: parseInt(set.repetitions),
            exerciseId: values.exercise?.id || '',
          }));
          await createSet(sets);
        } else {
          const personalRecord = {
            ...values.personalRecord!,
            weight: parseInt(values.personalRecord!.weight),
          };
          await createPersonalRecord(personalRecord);
        } */
        setValues({
          exercise: null,
          logType: 'Sets',
          sets: [],
          personalRecord: null,
        }); 

    };
    

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto max-w-screen-lg">
      <h2 className="text-2xl font-bold">Add Exercise Log</h2>
      <div className="mt-4">
        <label htmlFor="exercise" className="block text-lg font-medium">
          Exercise
        </label>
        <div className="relative">
          <select
            name="exercise"
            id="exercise"
            onChange={handleExerciseChange}
            value={values.exercise?.Exercise || ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Select an exercise</option>
            {exercises?.map((exercise, idx) => (
              <option key={idx} value={exercise.Exercise}>
                {exercise.Exercise}
              </option>
            ))}
            <option value="custom">Custom exercise</option>
          </select>
          {values.exercise?.Exercise === "custom" && (
            <input
              type="text"
              name="customExercise"
              id="customExercise"
              placeholder="Enter custom exercise name"
              className="absolute top-0 left-0 w-full h-full py-1 px-3 text-gray-900 bg-white rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  exercise: {Exercise: e.target.value },
                }))
              }
            />
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="logType" className="block text-lg font-medium">
          Log Type
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
        <div className="mt-4">
          <label className="block text-lg font-medium">Sets</label>
          <div className="space-y-2">
            {values.sets.map((set, index) => (
              <div key={set.setId} className="flex space-x-2">
                <div className="flex-none w-12 text-right">
                  <span className="text-lg font-medium">{set.setId}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div>
                    <label
                      htmlFor={`set-${set.setId}-weight`}
                      className="block text-gray-700 font-medium"
                    >
                      Weight
                    </label>
                    <input
                      type="number"
                      name={`set-${set.setId}-weight`}
                      id={`set-${set.setId}-weight`}
                      value={set.weight}
                      onChange={(e) =>
                        handleSetChange(index, "weight", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200
                  focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`set-${set.setId}-repetitions`}
                      className="block text-gray-700 font-medium"
                    >
                      Repetitions
                    </label>
                    <input
                      type="number"
                      name={`set-${set.setId}-repetitions`}
                      id={`set-${set.setId}-repetitions`}
                      value={set.repetitions}
                      onChange={(e) =>
                        handleSetChange(index, "repetitions", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                {index === values.sets.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddSet}
                    className="ml-2 px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    Add Set
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {values.logType === "Personal Record" && (
        <div className="mt-4">
          <label className="block text-lg font-medium">Personal Record</label>
          <div className="space-y-2">
            <div>
              <label
                htmlFor="personalRecordWeight"
                className="block text-gray-700 font-medium"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
  )
}
