'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';
import { ClassItem } from '@/types/clazz';
import { DayOfWeek } from '../class/[cid]/_store/TimetableStore';
import { BASE_API_URL } from './_constants';

export const fetchMyClazzList = async () => {
  return await requestAPI<ClassItem[], null>(HTTPMethod.GET, `${BASE_API_URL}/clazz/list`);
};

export type CreateClazzWithTimetableRequest = {
  clazzName: string;
  clazzDescription: string;
  clazzIcon: string;
  timetableRequest: {
    timetableName: string;
    timetableDays: DayOfWeek[];
    periodRequests: {
      periodName: string;
      periodDuration: number;
      periodStartTime: string;
      isAttendanceRequired: boolean;
    }[];
  };
};

type CreateClazzWithTimetableResponse = {
  clazzLink: string;
};

export const createClazzWithTimetable = async (payload: CreateClazzWithTimetableRequest) => {
  return await requestAPI<CreateClazzWithTimetableResponse, CreateClazzWithTimetableRequest>(HTTPMethod.POST, `${BASE_API_URL}/clazz/`, payload);
};
