import { ChevronDown, School, Settings } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { NavigationTabs } from './_components/NavigationTabs';
import { TimeHandler } from './_handler/TimeHandler';
import { PeriodHandler } from './_handler/PeriodHandler';
import { Period } from './_store/usePeriods';
import { getDay, getHours, getMonth, getYear, setDate, subDays, format } from 'date-fns';

const requestEchoAPI = <T,>(result: T) => {
  return new Promise<T>((resolve) => {
    const timerId = setTimeout(() => {
      resolve(result);
      clearTimeout(timerId);
    }, 1500);
  });
};

enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

type Timetable = {
  name: string;
  dayOfWeeks: DayOfWeek[];
  periods: Period[];
};

const _timetable: Timetable = {
  name: '열심히 살자',
  dayOfWeeks: [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
    DayOfWeek.SUNDAY,
  ],
  periods: [
    { id: 0, name: '오전1', startTime: new Date('2024-05-04 09:00:00'), duration: 180, isAttendacneRequired: false },
    { id: 1, name: '점심 시간', startTime: new Date('2024-05-04 12:00:00'), duration: 90, isAttendacneRequired: false },
    { id: 2, name: '오후1', startTime: new Date('2024-05-04 13:30:00'), duration: 240, isAttendacneRequired: false },
    { id: 3, name: '저녁 시간', startTime: new Date('2024-05-04 17:30:00'), duration: 90, isAttendacneRequired: false },
    { id: 4, name: '오후2', startTime: new Date('2024-05-04 19:00:00'), duration: 240, isAttendacneRequired: false },
  ],
};

export default async function Layout({ children, params }: PropsWithChildren<{ params: { cid: string } }>) {
  // const { cid } = params;

  // if (cid !== '12321') {
  //   notFound();
  // }
  const getServerTime = async () => requestEchoAPI(new Date('2024-05-04 12:45:00'));
  const getTimetable = async () => requestEchoAPI(_timetable);

  const serverTime = await getServerTime();
  const timetable = await getTimetable();

  const initialBaseTime =
    getHours(serverTime) < 5 ? format(subDays(serverTime, 1), 'yyyy-MM-dd') : format(serverTime, 'yyyy-MM-dd');

  /** 첫 교시가 05시에 시작하고 마지막 교시가 04에 끝나면,  .... 아 걍 5를 뺄까?*/
  const initialPeriods = timetable.periods.map((period) => ({
    ...period,
    startTime: new Date(`${initialBaseTime} ${format(period.startTime, 'hh:mm:ss')}`),
  }));

  return (
    <>
      <section>
        <div className="relative p-3 pb-0 md:p-6 md:pb-0">
          <div className="flex flex-row justify-between lg:absolute mb-3 md:mb-6 lg:mb-0 lg:w-[calc(100%-3rem)]">
            <div className="flex flex-row gap-2 p-2 items-center ">
              <span className="text-xl font-semibold">😇</span>
              <span className="text-xl font-semibold">생기발랄한 우리반</span>
              <ChevronDown className="size-5" />
            </div>

            <div className="flex flex-row">
              <button className="flex flex-row gap-2 items-center px-4 py-3">
                <School className="size-5" />
                <span className="text-xl font-semibold hidden md:block">반 정보</span>
              </button>

              <button className="flex flex-row gap-2 items-center px-4 py-3">
                <Settings className="size-5" />
                <span className="text-xl font-semibold hidden md:block">설정</span>
              </button>
            </div>
          </div>

          <NavigationTabs />
        </div>

        <main className="p-3 md:p-6">{children}</main>
      </section>

      <TimeHandler serverTime={serverTime} />
      <PeriodHandler initialPeriods={initialPeriods} />
    </>
  );
}
