import { addMinutes, addSeconds } from 'date-fns';
import { create } from 'zustand';

export const useCurrentTime = create<{
  currentTime: Date;
  setTime: (newTime: Date) => void;
  tick: () => void;
}>((set) => ({
  currentTime: new Date('2024-05-04 12:45:00'),
  setTime: (newTime: Date) => set({ currentTime: newTime }),
  tick: () => set(({ currentTime: prevTime }) => ({ currentTime: addMinutes(prevTime, 1) })),
}));
