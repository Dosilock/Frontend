export type SuccessResponse<T> = {
  status: number;
  payload: T;
};

export type ErrorResponse = {
  status: number;
  payload: ErrorObject;
};

export type ErrorObject = {
  errorCode: number;
  errorMessage: string;
};

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

export type EmptyResponse = null;
