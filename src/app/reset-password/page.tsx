import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import Link from 'next/link';
import MailForm from './_forms/MailForm';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';

export default function Page() {
  return (
    <section className="flex flex-col py-[4.5rem] px-[1.5rem] gap-8 md:max-w-[48rem] mx-auto min-h-dvh">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <HeadingWithDescription
        heading="비밀번호 재설정"
        description="가입했던 메일을 통해 비밀번호를 재설정할 수 있어요."
      />

      <MailForm />
    </section>
  );
}
