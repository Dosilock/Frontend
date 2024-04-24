'use server';

import { SendRegisterMailRequest } from './SendRegisterMailForm';

export async function sendRegisterMail(sendRegisterMailRequest: SendRegisterMailRequest) {
  console.log({ sendRegisterMailRequest });

  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  return { status: 'OK' };
}
