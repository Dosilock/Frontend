import Image from 'next/image';

import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { Button } from '@/components/ui/button';
import fox from '@/static/images/fox.jpg';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function Page() {
  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <div className="flex-1 flex flex-col gap-6 rounded-lg overflow-hidden items-center">
        <Image className="w-full aspect-[3/1] object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        <h1 className="text-2xl font-bold">비밀번호 재설정 완료</h1>
        <p className="text-center">비밀번호를 재설정하였습니다! 다시 로그인해주세요.</p>

        <div className="w-full flex-1 flex flex-col justify-end">
          <Button className="w-full" asChild>
            <Link href={'/login'}>로그인 페이지로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
