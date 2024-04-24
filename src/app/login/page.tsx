import { SocialLogins } from '@/components/SocialLogins/SocialLogins';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import fox from '../../static/images/fox.jpg';
import logo from '../../static/images/gongsilock-signature-bg-white.jpg';
import { LoginForm, LoginRequest } from './_forms/LoginForm';
import { loginService } from './_forms/LoginForm.action';

export default function Home() {
  const handleSubmit = async (loginRequest: LoginRequest) => {
    'use server';
    const response = await loginService(loginRequest);

    console.log({ loginRequest, response });

    const { status } = response;

    if (status === 'OK') {
      redirect('/class');
    }

    // TODO: Pass the error to LoginForm
  };

  return (
    <section className="grid place-items-center h-dvh">
      <section className="flex flex-row w-full max-w-[62.5rem] rounded-lg overflow-hidden h-full max-h-[43.75rem]">
        <div className="py-[2rem] px-[2.625rem] flex-1 flex items-center flex-col justify-between h-full">
          <Image src={logo.src} width={339} height={92} alt="Gongsilock Logo" />
          <LoginForm onSubmit={handleSubmit} />
          <Link href="/reset-password">비밀번호 잊음?</Link>
          <SocialLogins />
        </div>

        <div className="flex-1 hidden lg:block">
          <Image className="w-full h-full object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        </div>
      </section>
    </section>
  );
}
