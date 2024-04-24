import { SendRegisterMailForm, SendRegisterMailRequest } from '@/app/register/_forms/SendRegisterMailForm';
import { sendRegisterMail } from '../_forms/SendRegisterMailForm.action';

export default function Page() {
  const handleSubmit = async (sendReigsterFormRequest: SendRegisterMailRequest) => {
    const response = await sendRegisterMail(sendReigsterFormRequest);

    console.log({ response });
  };

  return (
    <section className="flex flex-col w-full max-w-[48rem] rounded-lg  gap-6 p-3 md:p-8 md:mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p>기존의 이메일로 공시락 서비스에 가입해보세요.</p>
      </div>

      <SendRegisterMailForm onSubmit={handleSubmit} />
    </section>
  );
}
