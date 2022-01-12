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
    // Hooray! Let them use the app now.
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    alert('Error: ' + error.code + ' ' + error.message);
  }
}

async function loginUser(email, password) {
  const user = await Parse.User.logIn(email, password);
  // Do stuff after successful login.
}

const UserService = { saveUser, loginUser };

export default UserService;
