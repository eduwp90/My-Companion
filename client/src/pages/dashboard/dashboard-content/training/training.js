import React, { useContext } from 'react';
import { PetsContext } from '../../petsContext';

function Training() {
  const { activePet, /* setActivePet, component, setComponent */} =
    useContext(PetsContext);
  return (
    <div>
      <p>TRAINING {activePet.get('Name')}</p>
    </div>
  );
}

export default Training;
