# My companion

<p align="center">
  <img src="images/appLogo-whitebg.png" width="400" />
</p>

This mobile oriented website helps keep track of your Dogs data, vet appointments & medication.
It was created during Codeworks bootcamp, in a period of a week, in order to practice and test coding skills.

# Screenshots

<p align="center">
<a href="images/promo shots.png"><img src="images/promo shots.png" width="800"  /></a>
</p>

# Main Features

- User register & authentication.
- Multiple pet profile creation & modification.
- Pet weight tracking by adding/removing registers, displayed by a graph.
- Schedule your pet appointments, like vet visits, vaccinations etc.
- Email reminders for the scheduled events.

# Instructions

- Clone this repository
- Navigate to `./client` and run `npm i`
- Navigate to `./server` and run `npm i`
- Create a `.env` in `./client` with the following structure and add your custom values on APP ID, JS KEY and MONGODB STRING:

```shell
REACT_APP_APP_ID=SOME_VALUE
DATABASE_URI=MONGODB_CONNECTION_STRING
REACT_APP_JAVASCRIPT_KEY=SOME_VALUE
REACT_APP_SERVER_URL=http://localhost:1337/database

#IF YOU WANT TO USE EMAIL NOTIFICATIONS
EMAIL=GMAIL_TO_USE
EMAIL_PASSWORD=GMAIL_PASSWORD
```

- Create a copy of the `.env` in `./client` and move it to `./server`
- In `./server` start the backend with `node index.js`
- In `./client` start the website with `npm start`

## Demo video:

[Video](https://youtu.be/nAHyZd0Ej88)

## Credits:

### Typescript conversion, unit tests & bugfixes:

Total conversion to Typescript, bugfixes and creation of a suite of tests for the project made by:

- Natasha Vermeulen || [LinkedIn](https://www.linkedin.com/in/natasha-vermeulen/) || [Github](https://github.com/natashajvandam) ||

- Jaime Diez Rodriguez || [LinkedIn](https://www.linkedin.com/in/jaimemastretta/) || [Github](https://github.com/jaimemastretta) ||

### Logo:

Dog icon made by Daniel Ducrocq from NounProject.com [LINK](https://thenounproject.com/schroederdaniel/)
