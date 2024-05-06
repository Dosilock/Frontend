'use server';

import { Period } from '../_store/usePeriods';

const requestEchoAPI = <T>(result: T) => {
  return new Promise<T>((resolve) => {
    const timerId = setTimeout(() => {
      resolve(result);
      clearTimeout(timerId);
    }, 1500);
  });
};

enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

type Timetable = {
  name: string;
  dayOfWeeks: DayOfWeek[];
  periods: Period[];
};

const _timetable: Timetable = {
  name: '열심히 살자',
  dayOfWeeks: [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
    DayOfWeek.SUNDAY,
  ],
  periods: [
    { id: 0, name: '오전1', startTime: new Date('2024-05-04 09:00:00'), duration: 180, isAttendacneRequired: false },
    { id: 1, name: '점심 시간', startTime: new Date('2024-05-04 12:00:00'), duration: 90, isAttendacneRequired: false },
    { id: 2, name: '오후1', startTime: new Date('2024-05-04 13:30:00'), duration: 240, isAttendacneRequired: false },
    { id: 3, name: '저녁 시간', startTime: new Date('2024-05-04 17:30:00'), duration: 90, isAttendacneRequired: false },
    { id: 4, name: '오후2', startTime: new Date('2024-05-04 19:00:00'), duration: 240, isAttendacneRequired: false },
  ],
};

export const getServerTime = async () => requestEchoAPI(new Date('2024-05-04 12:45:00'));
export const getTimetable = async () => requestEchoAPI(_timetable);
