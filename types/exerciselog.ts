import { Set } from "./set";
import { PersonalRecord } from "./personalRecord";

export type ExerciseLog = {
    id?: number; // the ID of the exercise log in the database
    exerciseId: number; // the ID of the exercise performed
    logType: 'Sets' | 'Personal Record'; // the type of log (Sets or Personal Record)
    sets?: Set[]; // an array of sets (only for Sets log type)
    personalRecord?: PersonalRecord; // the personal record (only for Personal Record log type)
    date: string; // the date the log was performed (in ISO string format, e.g. '2022-02-17T14:36:05.000Z')
  };