'use server';

import { SendSignUpMailRequest } from './SendSignUpMailForm';

export async function sendSignUpMail(sendSignUpMailRequest: SendSignUpMailRequest) {
  console.log({ sendSignUpMailRequest });

  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  return { status: 'OK' };
}
