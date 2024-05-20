'use server';

const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;
const CLAZZ_API_URL = `${BASE_API_URL}/clazz`;

const CLAZZ_ENDPOINT = {
  Default: `${CLAZZ_API_URL}`,
  At: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}`,
  MembersOf: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members`,
};

// const CLAZZ_ENDPOINT = {
//   GetMembers: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members`,
//   ApproveMember: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members/approve`,
//   RejectMember: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members/reject`,
//   ApplyToClazz: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members/apply`,
//   CreateClazz: `${CLAZZ_API_URL}`,
//   ClazzDetails: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}`,
// };

export const fetchClazzDetails = async (clazzId: string) => {
  return await fetch(CLAZZ_ENDPOINT.At(clazzId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
