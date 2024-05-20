import { ActionResponse, ActionStatus } from '@/types/actions';
import { APIResponse, ErrorResponse, SuccessResponse } from '@/types/api';

export enum FetchStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export type FetchSuccessResponse<T> = {
  status: FetchStatus.SUCCESS;
  fetchResponse: SuccessResponse<T>;
};

export type FetchFailResponse = {
  status: FetchStatus.FAIL;
  fetchResponse: ErrorResponse;
};

export type FetchResponse<T> = FetchSuccessResponse<T> | FetchFailResponse;

const handleResponse = async <T>(response: Response): Promise<FetchResponse<T>> => {
  console.log(`${response.status} >> ${response.url}`);

  // 정상 응답
  if (response.ok) {
    return {
      status: FetchStatus.SUCCESS,
      fetchResponse: await response.json(),
    } as FetchSuccessResponse<T>;
  }

  /**
   * handle failed HTTP Status
   * 아래와 같은 방식으로 제어하려고 했으나, 서버 API쪽에서 이거 자체를 내려주니까 Type만 지정해서 넘겨주면 됨
   */

  // if (response.status === 404) {
  //   return { status: 404, payload: { errorCode: 1101, errorMessage: '찾을 수 없음' } } as ErrorResponse;
  // }

  // if (response.status === 500) {
  //   return { status: 500, payload: { errorCode: 1101, errorMessage: '먼가 잘못됨' } } as ErrorResponse;
  // }

  const res = await response.json();
  console.log({ res });

  return {
    status: FetchStatus.FAIL,
    fetchResponse: res,
  } as FetchFailResponse;
};

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

type Fetcher = {
  [key in HTTPMethod]: <T, U = undefined>(url: string, headers?: Object, body?: U) => Promise<FetchResponse<T>>;
};

export const Fetcher: Fetcher = {
  get: async <T>(url: string, headers = {}) => await handleResponse<T>(await fetch(url, { headers })),
  post: async <T, U>(url: string, headers = {}, body: U) =>
    await handleResponse<T>(
      await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      })
    ),
  put: async <T, U>(url: string, headers = {}, body: U) =>
    await handleResponse<T>(
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      })
    ),
  delete: async <T>(url: string, headers = {}) =>
    await handleResponse<T>(
      await fetch(url, {
        method: 'DELETE',
        headers,
      })
    ),
  patch: async <T, U>(url: string, headers = {}, body: U) =>
    await handleResponse<T>(
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
      })
    ),
};

export const requestAPI = async <T, U = undefined>(
  method: HTTPMethod,
  url: string,
  headers = {},
  body?: U
): Promise<ActionResponse<T>> => {
  // Network Error or CORS 오류를 처리하기 위한 요청 함수

  try {
    // 정상 응답
    return {
      status: ActionStatus.RESPONSED,
      actionResponse: await Fetcher[method]<T, U>(url, headers, body),
    } as ActionResponse<T>;
  } catch (error) {
    // Network Error or CORS
    if (error instanceof Error) {
      return {
        status: ActionStatus.NETWORK_ERROR,
        actionResponse: error,
      } as ActionResponse<T>;
    }
    ``;
    // TypeError가 아닌 에러 처리..인데 이런 경우는 개발할 때 throw SOMETHING 이런 거 아니면 안 넘어올 듯?
    return {
      status: ActionStatus.NETWORK_ERROR,
      actionResponse: new Error(String(error)),
    } as ActionResponse<T>;
  }
};
