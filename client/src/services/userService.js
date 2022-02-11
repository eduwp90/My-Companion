import Parse from 'parse/dist/parse.min.js';

async function saveUser(email, password) {
  const user = new Parse.User();
  user.set('username', email);
  user.set('password', password);
  user.set('email', email);

  try {
    await user.signUp();
    const currentUser = Parse.User.current();
    console.log('Current user ', currentUser);
    return currentUser;
  } catch (error) {
    return error.message;
  }
}

async function loginUser(email, password) {
  try {
    await Parse.User.logIn(email, password);
    const currentUser = Parse.User.current();
    return currentUser;
  } catch (error) {
    return error.message;
  }
}

async function logoutUser() {
  try {
    await Parse.User.logOut();
    const currentUser = Parse.User.current();
    return currentUser;
  } catch (error) {
    return error.message;
  }
}

function getCurrentUser() {
  return Parse.User.current();
}

const UserService = { saveUser, loginUser, getCurrentUser, logoutUser };

export default UserService;
