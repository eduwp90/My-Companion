import React, { useContext } from 'react';
import { PetsContext } from '../petsContext';

function GeneralInfo() {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);
  return (
    <div>
      <p>OVERVIEW {activePet.get('Name')}</p>
    </div>
  );
}

export default GeneralInfo;
