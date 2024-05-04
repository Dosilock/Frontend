import { create } from 'zustand';

export type Period = {
  id: number;
  name: string;
  startTime: Date;
  duration: number;
};

type UsePeriodReturn = {
  currentPeriod: Period | null;
  updatePeriod: (newPeriod: Period) => void;
};

export const usePeriod = create<UsePeriodReturn>((set) => ({
  currentPeriod: null,
  updatePeriod: (newPeriod: Period) => set({ currentPeriod: newPeriod }),
}));
