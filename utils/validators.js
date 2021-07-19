export const isValidEmail = value => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(value);
}