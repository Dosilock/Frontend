import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  // OAuth 인증 제공자 구성
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // TODO fetch login with credentials
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        // If you return an object it will be persisted to the JSON Web Token and the user will be signed in, unless a custom signIn() callback is configured that subsequently rejects it.
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // 로그인 후에 들어오는 정보들임.

      const res = await fetch('YOUR_CUSTOM_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 필요한 데이터를 JSON 형식으로 전송
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          image: user.image,
        }),
      });

      // Custom Backend로부터의 응답 처리
      if (res.ok) {
        return true; // 성공 시 로그인 허용
      } else {
        return false; // 실패 시 로그인 거부
      }
    },
  },
});

export { handler as GET, handler as POST };
