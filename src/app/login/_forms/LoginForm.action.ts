'use server';

import { LoginRequest } from './LoginForm';

export type LoginResponse = {
  status: String;
  message?: string;
};

export async function loginService(loginRequest: LoginRequest) {
  console.log({ loginRequest });

  // TODO: fetch Login
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  return { status: 'OK' } as LoginResponse;
}
