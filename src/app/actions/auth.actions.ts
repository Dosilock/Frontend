'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';

const BASE_API_URL = 'https://dosilock.kro.kr/api/v1';
// const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;
const AUTH_API_URL = `${BASE_API_URL}/auth`;

const AUTH_ENDPOINT = {
  Default: `${AUTH_API_URL}`,
  SignUp: `${AUTH_API_URL}/signup`,
  SignupLink: `${AUTH_API_URL}/signup/link`,
  ResetPasswordLink: `${AUTH_API_URL}/reset-password-link`,
  Login: `${AUTH_API_URL}/signin`,
};

// const AUTH_ENDPOINT = {
//   ResetPasswordLink: `${AUTH_API_URL}/reset-password-link`,
//   SignupLink: `${AUTH_API_URL}/signup/link`,
//   Signup: `${AUTH_API_URL}/signup`,
//   Login: `${AUTH_API_URL}/login`,
// };

export type LoginServiceRequest = {
  email: string;
  password: string;
};

const testEndpoint = `${BASE_API_URL}/signin`;
export const loginService = async (payload: LoginServiceRequest) => {
  return await requestAPI<null, LoginServiceRequest>(HTTPMethod.POST, testEndpoint, payload);
};
