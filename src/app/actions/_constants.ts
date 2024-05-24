/** Base API URL */
export const BASE_API_URL = process.env.SPRING_SERVER_URL;

/**
 * RESTful API로 수정한다면 아래를 쓰게 될 것,, 이지만 일단 BASE_API_URL을 가져다가 쓰는 걸로.
 */

/** Auth */
export const AUTH_API_URL = `${BASE_API_URL}/auth`;

// export const AUTH_ENDPOINT = {
//   Default: `${AUTH_API_URL}`,
//   SignUp: `${AUTH_API_URL}/signup`,
//   SignupLink: `${AUTH_API_URL}/signup/link`,
//   ResetPasswordLink: `${AUTH_API_URL}/reset-password-link`,
//   Login: `${AUTH_API_URL}/signin`,
// };

/** Users */
export const USERS_API_URL = `${BASE_API_URL}/users`;

// export const USERS_ENDPOINT = {
//   Default: `${USERS_API_URL}`,
//   At: (userId: string) => `${USERS_API_URL}/${userId}`,
//   resetPassword: `${USERS_API_URL}/reset-password`,
//   mypage: `${USERS_API_URL}/me`,
//   myClazz: `${USERS_API_URL}/me/clazz`,
// };

/** Validate */
export const VALIDATE_API_URL = `${BASE_API_URL}/validate`;

// const VALIDATE_ENDPOINT = {
//   validate: `${BASE_API_URL}/validate-token`,
// };

/** Clazz */
export const CLAZZ_API_URL = `${BASE_API_URL}/clazz`;

// export const CLAZZ_ENDPOINT = {
//   Default: `${CLAZZ_API_URL}`,
//   At: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}`,
//   MembersOf: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members`,
// };

/** Timetable */
export const TIMETABLE_API_URL = `${BASE_API_URL}/timetable`;

// export const TIMETABLE_ENDPOINT = {
//   Default: `${TIMETABLE_API_URL}`,
//   At: (timetableId: string) => `${TIMETABLE_API_URL}/${timetableId}`,
// };
