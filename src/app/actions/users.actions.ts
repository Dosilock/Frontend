'use server';

const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;
const USERS_API_URL = `${BASE_API_URL}/users`;

const USERS_ENDPOINT = {
  Default: `${USERS_API_URL}`,
  At: (userId: string) => `${USERS_API_URL}/${userId}`,
  resetPassword: `${USERS_API_URL}/reset-password`,
  mypage: `${USERS_API_URL}/me`,
  myClazz: `${USERS_API_URL}/me/clazz`,
};

export const fetchMyDetails = async () => {
  return await fetch(USERS_ENDPOINT.mypage, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
