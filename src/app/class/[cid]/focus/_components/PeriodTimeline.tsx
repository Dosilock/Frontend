'use client';
import { cn } from '@/lib/utils';
import { addMinutes, differenceInMinutes, format, isSameMinute } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';

enum LabelType {
  SHORT,
  LONG,
}

const getDurationLabel = (dateA: Date, dateB: Date, labelType: LabelType = LabelType.SHORT) => {
  const duration = differenceInMinutes(dateA, dateB);

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const isLongType = labelType === LabelType.LONG;

  const hoursText = `${hours}${isLongType ? '시간' : 'H'}`;
  const minutesText = `${minutes}${isLongType ? '분' : 'M'}`;

  return [hours !== 0 ? hoursText : '', minutes !== 0 ? minutesText : ''].join(' ');
};

const getTimeRatio = (startDate: Date, currentDate: Date, endDate: Date) => {
  const total = +endDate - +startDate;
  const current = +currentDate - +startDate;

  return current / total;
};

const getTimeLabel = (time: Date, labelType: LabelType = LabelType.SHORT) => {
  const isLongType = labelType === LabelType.LONG;

  return format(time, isLongType ? 'aa h시 mm분' : 'HH:mm', { locale: ko });
};

// TODO: 모바일, 타블렛 에서 라벨 표기 전환 및 margin 보정
// 크기가 바뀌면 margin 보정이 먼저 일어나고, 그 다음 표기가 바뀌어서 맞지 않는다.

export const PeriodTimeline = () => {
  /** Prop으로 받을 것(아마도): startTime, endTime, currentTime */
  const startTime = new Date('2024-05-02 13:30:00');
  const endTime = new Date('2024-05-02 17:30:00');
  const [currentTime, setCurrentTime] = useState(new Date('2024-05-02 13:30:00'));

  const [isOverMobileSize, setIsOverMobileSize] = useState(
    () => typeof window === 'object' && window.innerWidth >= 768
  );
  const labelType = isOverMobileSize ? LabelType.LONG : LabelType.SHORT;

  /**
   * 현재 시각을 기준으로 ratio 비율이 증가
   * ratio를 가지고 [현재 시간, 현재 시각, 남은 시간]의 위치를 표시함.
   */
  const timeRatio = getTimeRatio(startTime, currentTime, endTime);

  /** 시간(현재 시간, 남은 시간) 표시 문구 */
  const currentDurationLabel = getDurationLabel(currentTime, startTime, labelType);
  const remainDurationLabel = getDurationLabel(endTime, currentTime, labelType);

  /** 시각(시작, 현재, 종료 시각) 표시 문구 */
  const curremtTimeLabel = getTimeLabel(currentTime, labelType);
  const startTimeLabel = getTimeLabel(startTime, labelType);
  const endTimeLabel = getTimeLabel(endTime, labelType);

  /**
   * dashed 라인의 크기 보정용
   * 되도록 CSS으로만 처리하고 싶었으나,, 요건 방법이 없는 듯함. 나중에 아이디어 생기면 수정
   * */
  const [marginInterpolation, setMarginInterpolation] = useState(0);
  const doneCalcuateMargin = marginInterpolation !== 0;

  useEffect(() => {
    const calcuateMargin = () => {
      const milestone = document.querySelector('.milestone');

      if (milestone === null) {
        return;
      }

      const margin = milestone.getBoundingClientRect().width / 2;
      setMarginInterpolation(margin);
    };

    const calcuateMobileSize = () => {
      setIsOverMobileSize(window.innerWidth >= 768);
    };

    const handleResize = () => {
      calcuateMobileSize();
      calcuateMargin();
    };

    calcuateMobileSize();
    calcuateMargin();

    window.addEventListener('resize', handleResize);

    /** 기능 테스트용 */
    const timerId = setInterval(() => {
      setCurrentTime((prevData) => {
        if (isSameMinute(prevData, endTime)) {
          clearInterval(timerId);
          return prevData;
        }
        return addMinutes(prevData, 1);
      });
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timerId);
    };

    // return () => {
    //   clearInterval(timerId);
    // };
  }, []);

  return (
    <div className="flex-1">
      {/* 진행 시간, 현재 시간, 남은 시간 */}
      <div
        className={cn('relative opacity-0 transition-opacity pointer-events-none', {
          ['opacity-100']: doneCalcuateMargin,
        })}
        style={{ marginInline: `${marginInterpolation}px` }}>
        <DurationLabel timeRatio={timeRatio} label={currentDurationLabel} />

        <div className="absolute bottom-0 -translate-x-1/2 translate-y-1 z-10" style={{ left: `${timeRatio * 100}%` }}>
          <TimeMilestone
            milestoneLabel="현재"
            timeLabel={curremtTimeLabel}
            order={TimeMilestoneOrder.TIME_TO_DOT}
            isActive
          />
        </div>

        <DurationLabel timeRatio={1 - timeRatio} label={remainDurationLabel} />

        <TimeMilestoneLine />
      </div>

      {/* 시작 시작, 종료 시간 */}
      <div className="flex-1 flex flex-row justify-between -translate-y-1 pointer-events-none relative">
        <TimeMilestone milestoneLabel="시작" timeLabel={startTimeLabel} order={TimeMilestoneOrder.DOT_TO_TIME} />
        <TimeMilestone milestoneLabel="종료" timeLabel={endTimeLabel} order={TimeMilestoneOrder.DOT_TO_TIME} />
      </div>
    </div>
  );
};

type DurationLabelProp = {
  timeRatio: number;
  label: string;
};

const DurationLabel = ({ label, timeRatio }: DurationLabelProp) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLSpanElement>(null);

  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    if (parentRef.current === null || childRef.current === null) {
      return;
    }

    const parentWidth = parentRef.current.getBoundingClientRect().width;
    const childWidth = childRef.current.getBoundingClientRect().width;

    console.log(parentWidth, childWidth);

    setIsNarrow(parentWidth <= childWidth);
  }, [label]);

  return (
    <div ref={parentRef} className="inline-block text-center translate-y-1/2" style={{ width: `${timeRatio * 100}%` }}>
      <span
        ref={childRef}
        className={cn(
          'text-xs px-1 py-[.125rem] bg-gray-50 rounded text-gray-700 whitespace-nowrap md:text-base visible',
          {
            ['invisible']: isNarrow,
          }
        )}>
        {label}
      </span>
    </div>
  );
};

enum TimeMilestoneOrder {
  'TIME_TO_DOT',
  'DOT_TO_TIME',
}

type TimeMilestoneProps = {
  milestoneLabel: string;
  timeLabel: string;
  order: TimeMilestoneOrder;
  isActive?: boolean;
};

const TimeMilestone = ({ milestoneLabel, order, timeLabel, isActive }: TimeMilestoneProps) => {
  const isDotToTime = order === TimeMilestoneOrder.DOT_TO_TIME;
  const isTimeToDot = order === TimeMilestoneOrder.TIME_TO_DOT;

  return (
    <div
      className={cn(
        'milestone flex gap-2 justify-center items-center transition-transform pointer-events-auto pointerdevice:hover:scale-125',
        {
          ['flex-col']: isDotToTime,
          ['flex-col-reverse']: isTimeToDot,
          ['origin-bottom']: isTimeToDot,
          ['origin-top']: isDotToTime,
        }
      )}>
      <div
        className={cn('flex justify-center items-center gap-1', {
          ['flex-col']: isDotToTime,
          ['flex-col-reverse']: isTimeToDot,
        })}>
        {/* Dot */}
        <div
          className={cn('size-2 rounded-full', {
            ['bg-green-700']: isActive,
            ['bg-gray-300']: !isActive,
          })}
        />

        {/* Milestone Lable */}
        <span
          className={cn('text-xs md:text-base', {
            ['text-green-700 font-semibold']: isActive,
            ['text-gray-400']: !isActive,
          })}>
          {milestoneLabel}
        </span>
      </div>

      {/* Time Lable */}
      <span className="text-base font-semibold text-green-700 px-2 py-1 bg-green-50 rounded whitespace-nowrap md:text-lg">
        {timeLabel}
      </span>
    </div>
  );
};

const TimeMilestoneLine = () => {
  // Dash 스타일 바꾸려면 나중에 d3나 svg로 처리해야 함
  return <div className="w-full border-t border-dashed border-grey-200 pointer-events-none" />;
};
