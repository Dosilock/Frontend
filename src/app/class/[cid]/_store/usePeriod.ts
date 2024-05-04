import { create } from 'zustand';

export type Period = {
  id: number;
  name: string;
  startTime: Date;
  duration: number;
};

type UsePeriodReturn = {
  currentPeriod: Period | null;
  periods: Period[];
  updatePeriod: (newPeriod: Period) => void;
  setPeriods: (periods: Period[]) => void;
};

export const usePeriod = create<UsePeriodReturn>((set) => ({
  currentPeriod: null,
  periods: [] as Period[],
  updatePeriod: (newPeriod: Period) => set({ currentPeriod: newPeriod }),
  setPeriods: (periods: Period[]) => set({ periods }),
}));
