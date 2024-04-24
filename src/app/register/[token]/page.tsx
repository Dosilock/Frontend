import { SignUpForm } from '@/app/register/_forms/SignUpForm';

type PageProps = {
  params: { token: string };
};
export default function Page({ params }: PageProps) {
  const { token } = params;

  return (
    <section className="flex flex-col w-full max-w-[48rem] rounded-lg  gap-6 p-3 md:p-8 md:mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">기본 정보 입력</h1>
        <p>공시락 서비스에 필요한 정보를 입력해주세요.</p>
      </div>

      <SignUpForm />
    </section>
  );
}
