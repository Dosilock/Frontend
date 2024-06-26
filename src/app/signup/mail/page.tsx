import { SendSignUpMailForm } from '@/app/signup/_forms/SendSignUpMailForm';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Page() {
  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <HeadingWithDescription heading="회원가입" description="기존의 이메일로 공시락 서비스에 가입해보세요." />

      <SendSignUpMailForm />
    </section>
  );
}
