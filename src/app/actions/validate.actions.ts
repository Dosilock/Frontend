'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';
import { BASE_API_URL } from './_constants';

type GetVerifiedEmailFromTokenRequest = {
  token: string;
};

type GetVerifiedEmailFromTokenResponse = {
  email: string;
};

export const getVerifiedEmailFromToken = async ({ token }: GetVerifiedEmailFromTokenRequest) => {
  return await requestAPI<GetVerifiedEmailFromTokenResponse, GetVerifiedEmailFromTokenRequest>(HTTPMethod.GET, `${BASE_API_URL}/link/${token}`);
};
