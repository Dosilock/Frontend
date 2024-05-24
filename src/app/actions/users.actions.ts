'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';
import { BASE_API_URL } from './_constants';

type ResetPasswordRequest = {
  password: string;
};

export const resetPassword = async ({ password }: ResetPasswordRequest) => {
  return await requestAPI<null, ResetPasswordRequest>(HTTPMethod.PATCH, `${BASE_API_URL}/users/reset-password`, {
    password,
  });
};
