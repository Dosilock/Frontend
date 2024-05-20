'use server';

const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;

const VALIDATE_ENDPOINT = {
  validate: `${BASE_API_URL}/validate-token`,
};

export const validateToken = async (token: string) => {
  return await fetch(VALIDATE_ENDPOINT.validate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
};
