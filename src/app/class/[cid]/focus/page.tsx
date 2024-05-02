'use client';

import { cn } from '@/lib/utils';
import { Expand, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Page() {
  const [marginInterpolation, setMarginInterpolation] = useState(0);

  const doneCalcuateMargin = marginInterpolation !== 0;

  useEffect(() => {
    const milestone = document.querySelector('.milestone');

    if (milestone === null) {
      return;
    }

    const margin = milestone.getBoundingClientRect().width / 2;
    setMarginInterpolation(margin);

    console.log({ margin });
  }, []);

  return (
    <section className="flex flex-col gap-6 lg:flex-row">
      <div
        id="focusSection"
        className="flex-1 flex flex-col min-h-[calc(100dvh-9.5rem)] relative md:min-h-[calc(100dvh-14rem)] lg:min-h-[calc(100dvh-9.25rem)] bg-gray-50">
        <div className="flex-1 flex justify-center items-center">
          <div>
            <p className="text-[2.625rem] font-bold text-green-700">오후1</p>
            <p className="text-lg font-semibold text-green-700 text-center">4시간</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <button className="w-full text-[1.3125rem] flex flex-row gap-2 items-center justify-center py-3 bg-green-50 rounded shadow-focusBtn active:scale-95 transition-transform">
            <Pause className="text-transparent fill-green-700" />
            <span>
              오늘 <strong className="text-green-700">56분 집중</strong>했어요.
            </span>
          </button>
        </div>
        {/**
         * NOTE: 나중에 d3로 하는 게 편할 것 같기도 하구
         * 저.. marginInterpolation을 JS로 계산 안 하고 하는 방법이 없을까 싶네 ㅠ
         */}
        <div className="flex-1 flex items-center justify-center select-none">
          <div className="flex-1">
            <div
              className={cn('relative opacity-0 transition-opacity', { ['opacity-100']: doneCalcuateMargin })}
              style={{ marginInline: `${marginInterpolation}px` }}>
              <div className="inline-block text-center w-[30%] translate-y-1/2">
                <span className="text-xs px-1 py-[.125rem] bg-gray-50 rounded text-gray-700">1H</span>
              </div>
              <div className="absolute left-[30%] bottom-0 -translate-x-1/2 translate-y-1">
                <TimeMilestone
                  milestoneLabel="현재"
                  timeLabel="14:30"
                  order={TimeMilestoneOrder.TIME_TO_DOT}
                  isActive
                />
              </div>
              <div className="inline-block text-center w-[70%] translate-y-1/2">
                <span className="text-xs px-1 py-[.125rem] bg-gray-50 rounded text-gray-700">3H</span>
              </div>
              <TimeMilestoneLine />
            </div>
            <div className="flex-1 flex flex-row justify-between -translate-y-1">
              <TimeMilestone milestoneLabel="시작" timeLabel="13:30" order={TimeMilestoneOrder.DOT_TO_TIME} />
              <TimeMilestone milestoneLabel="종료" timeLabel="17:30" order={TimeMilestoneOrder.DOT_TO_TIME} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <button
            onClick={() => {
              document.querySelector('#focusSection')!.requestFullscreen({
                navigationUI: 'show',
              });
            }}>
            <Expand />
          </button>
        </div>
      </div>

      <div className="lg:flex-1">
        <div>오늘 시간표</div>
        <div>오늘 할 일</div>
      </div>
    </section>
  );
}

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
        'milestone flex gap-2 justify-center items-center transition-transform pointerdevice:hover:scale-125',
        {
          ['flex-col']: isDotToTime,
          ['flex-col-reverse']: isTimeToDot,
          ['origin-bottom']: isTimeToDot,
          ['origin-top']: isDotToTime,
          // ['pointerdevice:hover:scale-125']: isActive,
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
          className={cn('text-xs', {
            ['text-green-700 font-semibold']: isActive,
            ['text-gray-400']: !isActive,
          })}>
          {milestoneLabel}
        </span>
      </div>

      {/* Time Lable */}
      <span className="text-base font-semibold text-green-700 px-2 py-1 bg-green-50 rounded">{timeLabel}</span>
    </div>
  );
};

const TimeMilestoneLine = () => {
  // Dash 스타일 바꾸려면 나중에 d3나 svg로 처리해야 함
  return <div className="w-full border-t border-dashed border-grey-200" />;
};
