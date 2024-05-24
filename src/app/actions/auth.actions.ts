'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';
import { BASE_API_URL } from './_constants';

export type LoginServiceRequest = {
  email: string;
  password: string;
};

export const loginService = async (payload: LoginServiceRequest) => {
  return await requestAPI<null, LoginServiceRequest>(HTTPMethod.POST, `${BASE_API_URL}/signin`, payload);
};

export type SendSignUpMailRequest = {
  email: string;
};

export const sendSignUpMail = async (payload: SendSignUpMailRequest) => {
  return await requestAPI<null, SendSignUpMailRequest>(HTTPMethod.POST, `${BASE_API_URL}/signup`, payload);
};

type SignUpWithEmailRequest = {
  email: string;
  password: string;
  nickname: string;
  profileImg: string;
  link: string;
};

export const signUpWithEmail = async (payload: SignUpWithEmailRequest) => {
  return await requestAPI<null, SignUpWithEmailRequest>(HTTPMethod.POST, `${BASE_API_URL}/signup/confirm`, payload);
};

type SendResetPasswordMailRequest = {
  email: string;
};

export const sendResetPasswordMail = async (payload: SendResetPasswordMailRequest) => {
  return await requestAPI<null, SendResetPasswordMailRequest>(HTTPMethod.POST, `${BASE_API_URL}/signup/confirm`, payload);
};
