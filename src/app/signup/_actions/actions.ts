/**
 * NOTE: API 문서들이 다 완료가 된 이후에 API 타입에 대한 코드를 작성하려고 했는데
 * 기본 응답 형식이 정해진 이상 공통 타입으로 빼야할 듯 함.
 * PM한테 이슈 작성 요구
 */

'use server';

const requestEchoAPI = <T>(result: T) => {
  return new Promise<T>((resolve) => {
    const timerId = setTimeout(() => {
      resolve(result);
      clearTimeout(timerId);
    }, 1500);
  });
};

/** TODO: API 응답 타입들은 전체 types 폴더로 옮기기 */
type SuccessResponse<T> = {
  status: 200;
  payload: T;
};

type ErrorResponse = {
  status: 500;
  payload: ErrorObject;
};

type ErrorObject = {
  errorCode: number;
  errorMessage: string;
};

type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

type GetVerifiedEmailFromTokenResponse = {
  email: string;
};

/**
 * Note: 테스트용 API
 * _withSuccess()는 들어온 인자 타입 그대로 반환합니다.
 * _withError()는 ErrorResponse를 반환합니다.
 * */
const _withSuccess = <T>(result: T) => ({ status: 200, payload: result } as APIResponse<T>);
const _withError = (errorObject: ErrorObject) => ({ status: 500, payload: errorObject } as ErrorResponse);

export const getVerifiedEmailFromToken = async (token: string) => {
  if (token == 'test_invalid') {
    return await requestEchoAPI(_withError({ errorCode: 1101, errorMessage: '이메일 중복' }));
  }

  return await requestEchoAPI(_withSuccess({ email: 'text@example.com' } as GetVerifiedEmailFromTokenResponse));
};
