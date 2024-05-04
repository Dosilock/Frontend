'use client';

import { usePeriod } from '../../_store/usePeriod';

export const PeriodName = () => {
  const { currentPeriod } = usePeriod();

  const hours = Math.floor((currentPeriod?.duration || 0) / 60);
  const minutes = (currentPeriod?.duration || 0) % 60;

  const hoursText = hours !== 0 ? `${hours}시간` : '';
  const minutesText = minutes !== 0 ? `${minutes}분` : '';

  const durationLabel = [hoursText, minutesText].join(' ').trim();

  return (
    <div>
      <p className="text-[2.625rem] font-bold text-green-700">{currentPeriod?.name}</p>
      <p className="text-lg font-semibold text-green-700 text-center">{durationLabel}</p>
    </div>
  );
};
