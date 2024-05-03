import { Pause } from 'lucide-react';
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
