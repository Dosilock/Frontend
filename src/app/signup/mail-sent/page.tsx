import Image from 'next/image';

import fox from '@/static/images/fox.jpg';
import { notFound } from 'next/navigation';

export default function Page({ searchParams }: { searchParams?: { mail: string } }) {
  if (searchParams === undefined) {
    notFound();
  }

  const { mail } = searchParams;

  console.log({ searchParams });

  return (
    <section className="grid place-items-center">
      <section className="flex flex-col w-full max-w-[48rem] gap-6 p-8">
        <div className="flex flex-col gap-6 rounded-lg overflow-hidden items-center">
          <Image className="w-full aspect-[3/1] object-cover" src={fox.src} width={1084} height={720} alt="fox" />
          <h1 className="text-2xl font-bold">회원가입 메일을 보냈습니다.</h1>
          <p className="text-center">
            <strong>{mail}</strong>으로 회원가입 메일을 보냈어요! <br />
            메일을 확인해주세요.
          </p>
        </div>
      </section>
    </section>
  );
}
