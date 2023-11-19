export const isInvalidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
};

export const isInvalidPassword = (password) => {
  return password.length < 8;
};
