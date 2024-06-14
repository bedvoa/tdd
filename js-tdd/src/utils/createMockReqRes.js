// req, res 객체
export const createMockReqRes = (
  email = "",
  password = "",
  id = 1,
  e = undefined,
  n = undefined
) => {
  const req = {
    params: { id },
    query: { e, n },
    body: {
      email,
      password,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  return { req, res };
};
