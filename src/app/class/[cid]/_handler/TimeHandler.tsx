'use client';

import { useEffect } from 'react';
import { useCurrentTime } from '../_store/useCurrentTime';
// import { TimerEvent, TimerEventAction } from '../_workers/_timeWorker';

export const TimeHandler = ({ serverTime }: { serverTime: Date }) => {
  const { currentTime, setTime, tick } = useCurrentTime();

  useEffect(() => {
    if (currentTime === null) {
      setTime(serverTime);
    }

    const timerWorker = new Worker(new URL('../_workers/timeWorker.js', import.meta.url), { type: 'module' });

    timerWorker.addEventListener('message', () => {
      tick();
    });

    const timerEvent = {
      action: 'start_timer',
      payload: { interval: 100 },
    };
    // const timerEvent: TimerEvent = {
    //   action: TimerEventAction.START_TIMER,
    //   payload: { interval: 1000 },
    // };

    timerWorker.postMessage(timerEvent);

    return () => {
      const timerEvent = { action: 'stop_timer' };
      // const timerEvent: TimerEvent = { action: TimerEventAction.STOP_TIMER };

      timerWorker.postMessage(timerEvent);
      timerWorker.terminate();
    };
  }, []);

  return <></>;
};
