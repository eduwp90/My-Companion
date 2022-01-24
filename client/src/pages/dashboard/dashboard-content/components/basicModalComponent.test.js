import { render, screen } from '@testing-library/react';
import BasicModalComponent from './basicModalComponent';
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

let treatment = [0, {treatment:"vacination"}]
let reminder = 'some reminder'

describe ('BasicModalComponent', () => {
  test ('BasicModalComponent should match snapshot', () => {
    const { container } = render(<BasicModalComponent isOpen={isOpen} onClose={onClose} handleChange={handleChange} treatment={treatment} reminder={reminder} selectIcon={selectIcon} />);
    expect (container.firstChild).toMatchSnapshot();
  })

})