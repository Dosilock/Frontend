import { FetchResponse } from '@/lib/fetcher';

export enum ActionStatus {
  RESPONSED = 'RESPONSED',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

export type ActionResponse<T> =
  | {
      status: ActionStatus.RESPONSED;
      actionResponse: FetchResponse<T>;
    }
  | {
      status: ActionStatus.NETWORK_ERROR;
      actionResponse: Error;
    };
