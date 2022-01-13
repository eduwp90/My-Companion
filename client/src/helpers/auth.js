function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g');
  return regex.test(email);
}

const Auth = { validateEmail };

export default Auth;
