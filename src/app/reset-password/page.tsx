import Link from 'next/link';
import MailForm from './_forms/MailForm';
import Image from 'next/image';
import logo from '@/static/images/gongsilock-signature-bg-white.jpg';

export default function Page() {
  return (
    <section className="flex flex-col inset-0 py-[4.5rem] px-[1.5rem] gap-8 md:max-w-[48rem] mx-auto h-dvh">
      <Link href="/login">
        <Image
          className="h-[3.25rem] md:h-[4.5rem] object-contain mx-auto"
          src={logo.src}
          width={339}
          height={92}
          alt="Gongsilock Logo"
        />
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold md:text-4xl">비밀번호 재설정</h1>
        <p>가입했던 메일을 통해 비밀번호를 재설정할 수 있어요.</p>
      </div>

      <MailForm />
    </section>
  );
}
