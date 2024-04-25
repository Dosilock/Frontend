import { SendSignUpMailForm, SendSignUpMailRequest } from '@/app/SignUp/_forms/SendSignUpMailForm';
import { sendSignUpMail } from '../_forms/SendSignUpMailForm.action';

export default function Page() {
  const handleSubmit = async (sendReigsterFormRequest: SendSignUpMailRequest) => {
    const response = await sendSignUpMail(sendReigsterFormRequest);

    console.log({ response });
  };

  return (
    <section className="flex flex-col w-full max-w-[48rem] rounded-lg  gap-6 p-3 md:p-8 md:mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p>기존의 이메일로 공시락 서비스에 가입해보세요.</p>
      </div>

      <SendSignUpMailForm onSubmit={handleSubmit} />
    </section>
  );
}
