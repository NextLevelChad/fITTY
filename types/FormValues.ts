import {LogType} from './LogType'
import { Set } from './set';
import { PersonalRecord } from './personalRecord';

export type FormValues = {
    exercise: string | null;
    logType: LogType;
    sets: Set[];
    personalRecord: PersonalRecord | null;
  };