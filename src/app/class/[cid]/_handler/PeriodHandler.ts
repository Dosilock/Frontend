'use client';

import TimeHandler from './TimeHandler';

const timeHandler = new TimeHandler(new Date('2024-05-03 14:30:00'));

export default class PeriodHandler {
  static _instance: PeriodHandler | null = null;
  static _timeHandler: TimeHandler | null = null;

  _callback: Function | null = null;

  constructor(callback?: Function) {
    if (PeriodHandler._instance !== null) {
      return PeriodHandler._instance;
    }

    if (this._callback === null && callback !== undefined) {
      this._callback = callback;
    }

    PeriodHandler._instance = this;
    PeriodHandler._timeHandler = TimeHandler.getInstance();
    PeriodHandler._timeHandler.subscribe(this.update.bind(this));
  }

  update({ currentTime, tick }: { currentTime: Date; tick: number }) {
    if (tick % 5 === 0) {
      console.log('5초');
      this._callback && this._callback(currentTime);
    }
    // console.log(`PeriodHandler: Current time is ${currentTime.toLocaleTimeString()}`);
    // console.log(`PeriodHandler: Current tick is ${tick}`);
  }

  static getInstance() {
    if (!PeriodHandler._instance) {
      PeriodHandler._instance = new PeriodHandler();
    }

    return PeriodHandler._instance;
  }
}
