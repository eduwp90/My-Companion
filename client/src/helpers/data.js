const breeds = [
  'affenpinscher',
  'african',
  'airedale',
  'akita',
  'appenzeller',
  'australian',
  'basenji',
  'beagle',
  'bluetick',
  'borzoi',
  'bouvier',
  'boxer',
  'brabancon',
  'briard',
  'buhund',
  'bulldog',
  'bullterrier',
  'cattledog',
  'chihuahua',
  'chow',
  'clumber',
  'cockapoo',
  'collie',
  'coonhound',
  'corgi',
  'cotondetulear',
  'dachshund',
  'dalmatian',
  'dane',
  'deerhound',
  'dhole',
  'dingo',
  'doberman',
  'elkhound',
  'entlebucher',
  'eskimo',
  'finnish',
  'frise',
  'germanshepherd',
  'greyhound',
  'groenendael',
  'havanese',
  'hound',
  'husky',
  'keeshond',
  'kelpie',
  'komondor',
  'kuvasz',
  'labradoodle',
  'labrador',
  'leonberg',
  'lhasa',
  'malamute',
  'malinois',
  'maltese',
  'mastiff',
  'mexicanhairless',
  'mix',
  'mountain',
  'newfoundland',
  'otterhound',
  'ovcharka',
  'papillon',
  'pekinese',
  'pembroke',
  'pinscher',
  'pitbull',
  'pointer',
  'pomeranian',
  'poodle',
  'pug',
  'puggle',
  'pyrenees',
  'redbone',
  'retriever',
  'ridgeback',
  'rottweiler',
  'saluki',
  'samoyed',
  'schipperke',
  'schnauzer',
  'setter',
  'sheepdog',
  'shiba',
  'shihtzu',
  'spaniel',
  'springer',
  'stbernard',
  'terrier',
  'tervuren',
  'vizsla',
  'waterdog',
  'weimaraner',
  'whippet',
  'wolfhound',
];

//FROM THE TOY PROBLEM:

function giveMeTime(timeStamp) {
  //get difference of time
  const now = new Date(Date.now()).getTime();
  const diff = now - timeStamp;

  //less than a min difference
  if (diff < 60000) return 'now';
  //less than a hour difference
  else if (diff < 36e5)
    return createTimeString((diff / 60e3).toFixed(), 'mins');
  //less than a day difference
  else if (diff < 864e5)
    return createTimeString((diff / 36e3).toFixed(), 'hours');
  //less than a week difference
  else if (diff < 6048e5)
    return createTimeString((diff / 864e5).toFixed(), 'days');
  //less than a month difference
  else if (diff < 26298e5)
    return createTimeString((diff / 6048e5).toFixed(), 'weeks');
  //less than a year difference
  else if (diff < 315576e5)
    return createTimeString((diff / 26298e5).toFixed(), 'months');
  //more than a year difference
  else return createTimeString((diff / 315576e5).toFixed(), 'years');

  function createTimeString(amount, type) {
    if (amount == '1') type = type.slice(0, -1);
    return `${amount} ${type}`;
  }
}

const Data = { breeds, giveMeTime };

export default Data;
