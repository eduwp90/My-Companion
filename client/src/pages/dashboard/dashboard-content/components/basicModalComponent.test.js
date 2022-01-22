import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasicModalComponent from './basicModalComponent';
import Data from '../../../../helpers/data';
import {
  isOpen, 
  onClose,
} from '@chakra-ui/icons'

const handleChange = e => {
  console.log('handled');
};
const selectIcon = () => {
  console.log('selected')
}

let filledIn = {
  name: 'Dog Name',
  gender: 'Female',
  breed: 'Mix',
  dateOfBirth: '2020-01-01',
  color: 'Brown',
  chipId: '123',
};

let notFilledIn = {
  name: '',
  gender: '',
  breed: '',
  dateOfBirth: '',
  color: '',
  chipId: '',
}

let treatment = [0, {treatment:"vacination"}]
let reminder = 'some reminder'

describe ('BasicModalComponent', () => {
  test ('BasicModalComponent should match snapshot', () => {
    const { container } = render(<BasicModalComponent isOpen={isOpen} onClose={onClose} handleChange={handleChange} treatment={treatment} reminder={reminder} selectIcon={selectIcon} />);
    expect (container.firstChild).toMatchSnapshot();
  })

})