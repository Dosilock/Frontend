'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';
import { BASE_API_URL } from './_constants';

// export const fetchTimetableDetails = async (timetableId: string) => {
//   return await fetch(TIMETABLE_ENDPOINT.At(timetableId), {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

type FetchTimetableDetailsRequest = {
  clazzId: string;
};

export const fetchTimetableDetails = async (payload: FetchTimetableDetailsRequest) => {
  return await requestAPI<null, FetchTimetableDetailsRequest>(HTTPMethod.GET, `${BASE_API_URL}/timetable`, payload);
};
