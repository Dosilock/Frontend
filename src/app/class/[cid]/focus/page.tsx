import { Expand, Pause } from 'lucide-react';
import { PeriodTimeline } from './_components/PeriodTimeline';

export default function Page() {
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
          <PeriodTimeline />
          {/* <div className="flex-1">
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
          </div> */}
        </div>

        {/* <div className="absolute top-0 right-0">
          <button
            onClick={() => {
              document.querySelector('#focusSection')!.requestFullscreen({
                navigationUI: 'show',
              });
            }}>
            <Expand />
          </button>
        </div> */}
      </div>

      <div className="lg:flex-1">
        <div>오늘 시간표</div>
        <div>오늘 할 일</div>
      </div>
    </section>
  );
}
