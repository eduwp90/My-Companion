import Parse from 'parse/dist/parse.min.js';

async function savePet(user, pet, photo) {
  const newPet = new Parse.Object('Pets');
  newPet.set('Name', pet.name);
  newPet.set('Breed', pet.breed);
  newPet.set('Color', pet.color);
  newPet.set('DOB', Date.parse(pet.dateOfBirth));
  newPet.set('Owner', user);
  newPet.set('Chip ID', pet.chipId);

  if (photo) {
    const parseFile = new Parse.File('petPhoto', photo);
    newPet.set('Photo', parseFile);
  }

  try {
    await newPet.save();

    return newPet;
  } catch (error) {
    return error.message;
  }
}

async function findPetsByUser(user) {
  const Pets = Parse.Object.extend('Pets');
  const query = new Parse.Query(Pets);
  query.equalTo('Owner', user);
  const results = await query.find();

  return results;
}

async function uploadImage(file) {
  const name = 'photo.png';

  const parseFile = new Parse.File(name, file);

  try {
    await parseFile.save();
    return parseFile;
  } catch (error) {
    console.error(error);
    return;
  }
}

const PetsService = { savePet, findPetsByUser, uploadImage };

export default PetsService;
