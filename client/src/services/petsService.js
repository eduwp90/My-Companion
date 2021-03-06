import Parse from 'parse/dist/parse.min.js';

async function savePet(user, pet, photo) {
  const newPet = new Parse.Object('Pets');
  newPet.set('Name', pet.name);
  newPet.set('Breed', pet.breed);
  newPet.set('Color', pet.color);
  newPet.set('Gender', pet.gender);
  newPet.set('DOB', Date.parse(pet.dateOfBirth));
  newPet.set('Owner', user);
  newPet.set('ChipID', pet.chipId);
  newPet.set('Weight', []);
  newPet.set('LTTreatments', []);

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

async function updatePet(pet, data) {
  pet.set('Name', data.name);
  pet.set('Breed', data.breed);
  pet.set('Color', data.color);
  pet.set('Gender', data.gender);
  pet.set('DOB', Date.parse(data.dateOfBirth));
  pet.set('ChipID', data.chipId);

  try {
    await pet.save();

    return pet;
  } catch (error) {
    return error.message;
  }
}

async function updateWeightArray(pet, array) {
  pet.set('Weight', array);

  try {
    await pet.save();

    return pet;
  } catch (error) {
    return error.message;
  }
}

async function updateLTArray(pet, array) {
  pet.set('LTTreatments', array);

  try {
    await pet.save();

    return pet;
  } catch (error) {
    return error.message;
  }
}

async function updateMedicationArray(pet, array) {
  pet.set('Medication', array);

  try {
    await pet.save();

    return pet;
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

const PetsService = {
  savePet,
  findPetsByUser,
  uploadImage,
  updatePet,
  updateWeightArray,
  updateLTArray,
  updateMedicationArray,
};

export default PetsService;
