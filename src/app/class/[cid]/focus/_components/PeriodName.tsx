'use client';

import { Period, usePeriod } from '../../_store/usePeriod';

export const PeriodName = () => {
  const { currentPeriod } = usePeriod();

  const periodNameLabel = getPeriodNameLabel(currentPeriod);
  const durationLabel = getDurationLavel(currentPeriod);

  return (
    <div>
      <p className="text-[2.625rem] font-bold text-green-700">{periodNameLabel}</p>
      <p className="text-lg font-semibold text-green-700 text-center">{durationLabel}</p>
    </div>
  );
};

const getPeriodNameLabel = (currentPeriod: Period) => {
  const isBeforeFirstClass = currentPeriod === -1;
  const isAfterLastClass = currentPeriod === 99;

  const isNoPeriod = isBeforeFirstClass || isAfterLastClass;

  if (isNoPeriod) {
    return '자습시간';
  }

  return currentPeriod?.name;
};

const getDurationLavel = (currentPeriod: Period) => {
  const isBeforeFirstClass = currentPeriod === -1;
  const isAfterLastClass = currentPeriod === 99;

  if (isBeforeFirstClass) {
    return '시간표 시작 전';
  }

  if (isAfterLastClass) {
    return '시간표 마무리 후';
  }

  const hours = Math.floor((currentPeriod?.duration || 0) / 60);
  const minutes = (currentPeriod?.duration || 0) % 60;

  const hoursText = hours !== 0 ? `${hours}시간` : '';
  const minutesText = minutes !== 0 ? `${minutes}분` : '';

  const durationLabel = [hoursText, minutesText].join(' ').trim();

  return durationLabel;
};
