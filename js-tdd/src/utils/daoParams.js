export const paramsFn = (
  userSeq = 1,
  email = "test@test.com",
  userName = "test"
) => {
  return {
    userSeq,
    email,
    userName,
  };
};
