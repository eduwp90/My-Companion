import React, { useContext } from 'react';
import { PetsContext } from '../../petsContext';

function Health() {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);
  return (
    <div>
      <p>HEALTH {activePet.get('Name')}</p>
    </div>
  );
}

export default Health;
