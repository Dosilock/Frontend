let _timerId = null;

typeof self === 'object' &&
  self.addEventListener('message', (event) => {
    console.log('너 왜 일 안 해...');
    const { data: timerEvent } = event;

    const wouldStartTimer = timerEvent.action === 'start_timer';

    if (wouldStartTimer) {
      const { interval } = timerEvent.payload;

      if (_timerId !== null) {
        return;
      }

      _timerId = setInterval(() => {
        postMessage(null);
      }, interval);
    }

    const wouldEndTimer = timerEvent.action === 'stop_timer';

    if (wouldEndTimer && _timerId !== null) {
      clearInterval(_timerId);
    }
  });
