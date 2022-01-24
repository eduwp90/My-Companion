import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasicInfoFormComponent from './basicInfoFormComponent';
import Data from '../../../../helpers/data';
const handleChange = e => {
  1+1;
};

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


describe ('BasicInfoFormComponent', () => {
  test ('BasicInfoFormComponent should match snapshot', () => {
    const { container } = render(<BasicInfoFormComponent parent={filledIn} handleChange={handleChange} formLabel={false} size={"sm"} Data={Data} editable={true} />);
    expect (container.firstChild).toMatchSnapshot();
  })

  test('should render form labels if formLabel set to true', () => {
    render(<BasicInfoFormComponent parent={filledIn} handleChange={handleChange} formLabel={true} size={"sm"} Data={Data} editable={true} />)
    screen.getByText(/Pet name/)
    screen.getByText(/Gender/)
    screen.getByText(/Breed/)
  })
  test('should not render form labels if formLable set to false', () => {
    render(<BasicInfoFormComponent parent={filledIn} handleChange={handleChange} formLabel={false} size={"sm"} Data={Data} editable={true} />)
    const label1 = screen.queryByText(/Pet name/)
    const label2 = screen.queryByText(/Breed/)
    expect(label1).not.toBeInTheDocument()
    expect(label2).not.toBeInTheDocument()
  })

  test('form should render correctly when formLabel set to true', () => {
    render(<BasicInfoFormComponent parent={filledIn} handleChange={handleChange} formLabel={true} size={"sm"} Data={Data} editable={true} />)
    screen.getByPlaceholderText(/Enter pet name/)
    screen.getByPlaceholderText(/Enter pet name/)
    screen.getByPlaceholderText(/Enter pet name/)
  })
  test('form should render correctly when formLabel set to false', () => {
    render(<BasicInfoFormComponent parent={filledIn} handleChange={handleChange} formLabel={false} size={"sm"} Data={Data} editable={true} />)
    screen.getByPlaceholderText(/Enter hair color/)
    screen.getByPlaceholderText(/Select birth date/)
    screen.getByPlaceholderText(/Enter pet Chip ID number/)
  })

  test('form should render correctly when formLabel set to true and no pre-defined input', () => {
    render(<BasicInfoFormComponent parent={notFilledIn} handleChange={handleChange} formLabel={true} size={"sm"} Data={Data} editable={true} />)
    screen.getByPlaceholderText(/Enter hair color/)
    screen.getByPlaceholderText(/Select birth date/)
    screen.getByPlaceholderText(/Enter pet Chip ID number/)
  })

  test('form should render correctly when formLabel set to false and no pre-defined input', () => {
    render(<BasicInfoFormComponent parent={notFilledIn} handleChange={handleChange} formLabel={false} size={"sm"} Data={Data} editable={true} />)
    screen.getByPlaceholderText(/Enter hair color/)
    screen.getByPlaceholderText(/Select birth date/)
    screen.getByPlaceholderText(/Enter pet Chip ID number/)
  })

  test('form should be able to submit when filled out', () => {
    render(<BasicInfoFormComponent parent={notFilledIn} handleChange={handleChange} formLabel={false} size={"sm"} Data={Data} editable={true} />)
    const nameInput = screen.getByPlaceholderText(/Enter pet name/)
    const colorInput = screen.getByPlaceholderText(/Enter hair color/)
    const bdayInput = screen.getByPlaceholderText(/Select birth date/)
    const chipInput = screen.getByPlaceholderText(/Enter pet Chip ID number/)
    const breedInput = screen.getByTestId(/select/)
    const gender = screen.getByTestId(/radio/)

    userEvent.type(nameInput, 'example name')
    userEvent.type(colorInput, 'example color')
    userEvent.type(bdayInput, '2020-01-01')
    userEvent.type(chipInput, '1234')
    userEvent.selectOptions(breedInput, 'Mix')
    userEvent.click(gender)
  })

})