import { SendSignUpMailForm } from '@/app/signup/_forms/SendSignUpMailForm';
import { redirect } from 'next/navigation';

export default function Page() {
  const handleSuccess = async (email: string) => {
    'use server';
    // console.log('성공!');
    redirect(`/signup/mail-sent?mail=${email}`);
  };

  return (
    <section className="flex flex-col w-full max-w-[48rem] rounded-lg  gap-6 p-3 md:p-8 md:mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p>기존의 이메일로 공시락 서비스에 가입해보세요.</p>
      </div>

      <SendSignUpMailForm onSuccess={handleSuccess} />
    </section>
  );
}
