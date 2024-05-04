'use client';

// // timetable은 순서 보장.
const timetable = [
  { id: 0, name: '오전1', startTime: new Date('2024-05-03 13:00:00'), duration: 10, isAttendacneRequired: false },
  { id: 1, name: '쉬는 시간', startTime: new Date('2024-05-03 13:10:00'), duration: 10, isAttendacneRequired: false },
  { id: 2, name: '오전2', startTime: new Date('2024-05-03 13:20:00'), duration: 10, isAttendacneRequired: false },
  { id: 3, name: '쉬는 시간', startTime: new Date('2024-05-03 13:30:00'), duration: 10, isAttendacneRequired: false },
];

import EventEmitter from './EventEmitter';

// let currentTime = new Date('2024-05-03 12:50:00');

// // 현재 교시에 대한 정보 반환
// // -1 - 시간표 전, 99 - 시간표 후
// // 0 ~ 98: (n + 1) 교시, (0 -> 1교시, 1 -> 2교시)
// const getCurrentPeriod = (timetable, currentTime) => {
//   // (1) 시간표 시작 전인지 확인
//   const firstPeriod = timetable[0];
//   const isBeforeFirstPeriod = currentTime.getTime() < firstPeriod.startTime.getTime();

//   if (isBeforeFirstPeriod) {
//     return -1;
//   }

//   // (2) 시간표 종료 후인지 확인
//   const lastPeriod = timetable.at(-1);
//   const isAfterLastPeriod = currentTime.getTime() > addMinutes(lastPeriod.startTime, lastPeriod.duration - 1).getTime();

//   if (isAfterLastPeriod) {
//     return 99;
//   }

//   // (3) 시간표 시간 확인
//   const matchPeriod = timetable
//     .filter((period) => {
//       const isOverStartTime = period.startTime.getTime() <= currentTime.getTime();
//       const isUnderEndTime = currentTime.getTime() < addMinutes(period.startTime, period.duration).getTime();
//       const isInPeriod = isOverStartTime && isUnderEndTime;

//       return isInPeriod;
//     })
//     .at(0);

//   // matchPeriod가 []인 경우는 never

//   return matchPeriod;
// };

// function addMinutes(date, minutes) {
//   const newDate = new Date(date.getTime() + minutes * 60000);
//   return newDate;
// }

// const timerId = setInterval(() => {
//   const currentPeriod = getCurrentPeriod(timetable, currentTime);

//   if (currentPeriod === 99) {
//     console.log('시간표 끝!');
//     return clearInterval(timerId);
//   }

//   if (currentPeriod === -1) {
//     console.log('시작 전입니다: ', currentTime);
//   } else {
//     console.log({ currentTime, curPeriod: currentPeriod.id });
//   }

//   currentTime = addMinutes(currentTime, 1);
// }, 100);

const TIME_TICK = 1000;

export default class TimeHandler {
  static _eventEmitter = new EventEmitter();

  static _instance: TimeHandler | null = null;
  static _timerId: NodeJS.Timeout | null = null;

  static _currentTime: Date | null = null;
  static _tick: number = 0;

  constructor(currentTime?: Date) {
    if (TimeHandler._instance !== null) {
      return TimeHandler._instance;
    }

    TimeHandler._instance = this;

    this.start(currentTime);
  }

  subscribe(fn: Function) {
    TimeHandler._eventEmitter.on('TIME_TICK', fn);
  }

  start(currentTime?: Date) {
    if (TimeHandler._currentTime === null && currentTime !== undefined) {
      TimeHandler._currentTime = currentTime;
    }

    TimeHandler._timerId = setInterval(this.handleInterval, TIME_TICK);
  }

  handleInterval = () => {
    TimeHandler._currentTime = addSeconds(TimeHandler._currentTime || new Date(), 1);
    TimeHandler._tick++;

    TimeHandler._eventEmitter.emit('TIME_TICK', {
      currentTime: TimeHandler._currentTime,
      tick: TimeHandler._tick,
    });
  };

  getCurrentTime() {
    return TimeHandler._currentTime;
  }

  getTick() {
    return TimeHandler._tick;
  }

  static getInstance() {
    if (TimeHandler._instance === null) {
      TimeHandler._instance = new TimeHandler();
    }

    return TimeHandler._instance;
  }
}

function addSeconds(date: Date, seconds: number) {
  const newDate = new Date(date.getTime() + seconds * 1000);
  return newDate;
}
