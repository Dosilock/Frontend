'use server';

export const requestTokenValidation = async (token: string) => {
  try {
    // api 개발 완료되면 엔드 포인트 추가 예정
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    return response.json();
  } catch (error) {
    alert('토큰 확인 요망 👾');
    console.error('Token Validation Error: ', error);
  }
};
