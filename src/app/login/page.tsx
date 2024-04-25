import { SocialLogins } from '@/components/SocialLogins/SocialLogins';
import Image from 'next/image';
import Link from 'next/link';
import fox from '../../static/images/fox.jpg';
import logo from '../../static/images/gongsilock-signature-bg-white.jpg';
import { LoginForm } from './_forms/LoginForm';
import { redirect } from 'next/navigation';

export default function Home() {
  const handleSuccess = async () => {
    'use server';

    console.log('성공성공~');
    redirect('/class');
  };

  return (
    <section className="grid place-items-center h-dvh">
      <section className="flex flex-row w-full max-w-[62.5rem] rounded-lg overflow-hidden justify-center h-max-min">
        <div className="py-[2rem] px-[2.625rem] flex-1 flex items-center flex-col space-y-12 h-full max-w-[48rem]">
          <Image
            className="h-[3.25rem] md:h-[5.75rem] object-contain"
            src={logo.src}
            width={339}
            height={92}
            alt="Gongsilock Logo"
          />
          <LoginForm onSuccess={handleSuccess} />
          <Link className="underline w-full text-center" href="/reset-password">
            비밀번호를 잊으셨나요?
          </Link>
          <SocialLogins />
        </div>

        <div className="flex-1 hidden lg:block">
          <Image className="w-full h-full object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        </div>
      </section>
    </section>
  );
}
