'use server';

import { ActionStatus } from '@/enums/ActionStatus';
import { FormState } from '@/types/actions';

export async function resetPassword(prevState: FormState, data: FormData): Promise<FormState> {
  console.log('resetPassword: ', { prevState, data: Object.fromEntries(data) });

  // TODO: request api to send reset-password mail
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/confirm`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(Object.fromEntries(data)),
  // });

  // return { status: ActionStatus.Error, issues: ['에러여 에러'] };
  return { status: ActionStatus.Success, fields: Object.fromEntries(data) as Record<string, string> };
}
