'use client';

import { useEffect } from 'react';
import { CurrentTimeStatus, useCurrentTime } from '../_store/useCurrentTime';
import { TimerEvent, TimerEventAction } from '../_workers/timeWorker';

export const TimeHandler = ({ serverTime }: { serverTime: Date }) => {
  const { status: currentTimeStatus, initializeTime, tick } = useCurrentTime();

  useEffect(() => {
    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      return initializeTime(serverTime);
    }

    const timerWorker = new Worker(new URL('../_workers/timeWorker.ts', import.meta.url), { type: 'module' });

    timerWorker.addEventListener('message', () => {
      tick();
    });

    const timerEvent: TimerEvent = {
      action: TimerEventAction.START_TIMER,
      payload: { interval: 1000 },
    };

    timerWorker.postMessage(timerEvent);

    return () => {
      const timerEvent: TimerEvent = { action: TimerEventAction.STOP_TIMER };

      timerWorker.postMessage(timerEvent);
      timerWorker.terminate();
    };
  }, [currentTimeStatus]);

  return <></>;
};
