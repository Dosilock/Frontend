'use client';

export default class EventEmitter {
  _events = new Map<string, Function[]>();

  constructor() {}

  on(eventName: string, listner: Function) {
    this._events.set(eventName, [...(this._events.get(eventName) || []), listner]);
  }

  emit(eventName: string, data: any) {
    const eventListeners = this._events.get(eventName);

    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(data);
      });
    }
  }
}
