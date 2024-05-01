import { Megaphone } from 'lucide-react';
import { ReactNode } from 'react';

export default function Layout({
  groupFocus,
  recentFocus,
  timetable,
  todayRank,
}: {
  groupFocus: ReactNode;
  recentFocus: ReactNode;
  timetable: ReactNode;
  todayRank: ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-row gap-2 p-3 items-start bg-green-50 rounded md:gap-6">
        <div className="flex flex-row gap-1 min-w-fit items-center">
          <Megaphone className="size-4" />
          <span className="font-semibold hidden md:block">공지사항</span>
        </div>

        <span className="leading-none md:leading-normal">
          <strong>황영웅</strong>(이)가 <strong>7시간 동안 집중</strong>하는 중입니다! 미쳐날뛰고 있군요!
        </span>
      </div>

      <div>
        {recentFocus}
        {groupFocus}
      </div>

      <div>
        {todayRank}
        {timetable}
      </div>
    </section>
  );
}
