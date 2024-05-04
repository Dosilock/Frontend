/**
 * timeWorker는 1초마다 알려주는 Web Worker임.
 */

export enum TimerEventAction {
  START_TIMER,
  STOP_TIMER,
}

export type TimerEvent =
  | {
      action: TimerEventAction.START_TIMER;
      payload: { interval: number };
    }
  | {
      action: TimerEventAction.STOP_TIMER;
    };

let _timerId: NodeJS.Timeout | null = null;

if (typeof window !== undefined) {
  window.addEventListener('message', (event: MessageEvent<TimerEvent>) => {
    console.log('너 왜 일 안 해...');
    const { data: timerEvent } = event;

    const wouldStartTimer = timerEvent.action === TimerEventAction.START_TIMER;

    if (wouldStartTimer) {
      const { interval } = timerEvent.payload;

      _timerId = setInterval(() => {
        postMessage(null);
      }, interval);
    }

    const wouldEndTimer = timerEvent.action === TimerEventAction.STOP_TIMER;

    if (wouldEndTimer && _timerId !== null) {
      clearInterval(_timerId);
    }
  });
}
