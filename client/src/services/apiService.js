const BASE_URL = 'http://localhost:1337';
// const BASE_URL = "https://cw-events-092017.herokuapp.com";

async function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then(res => (res.status < 400 ? res : Promise.reject()))
    .then(res => (res.status !== 204 ? res.json() : res))
    .catch(err => {
      console.log('Error fetching:', err);
    });
}

function addReminder(body) {
  return fetchRequest('/reminders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

const ApiService = { addReminder };

export default ApiService;
