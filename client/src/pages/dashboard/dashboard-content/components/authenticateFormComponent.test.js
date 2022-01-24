import { render, screen } from '@testing-library/react';
import AuthenticateFormComponent from './authenticateFormComponent';
import Auth from '../../../../helpers/auth';


let error = {
  isError: false,
  errorMessage: '',
};

let event = {
  email: '',
  password: '',
}

const handleChange = e => {
  1+1;
};

const invalidPassword = event.password !== event.repeat;

const invalidEmail = event.email.length
  ? !Auth.validateEmail(event.email)
  : false;


describe ('BasicInfoFormComponent', () => {
  test ('BasicInfoFormComponent should match login snapshot', () => {
    const { container } = render(<AuthenticateFormComponent error={error} event={event} handleChange={handleChange} isRegistered={true} invalidPassword={undefined} invalidEmail={undefined} spacing={"8"} />);
    expect (container.firstChild).toMatchSnapshot();
  })

  test ('BasicInfoFormComponent should match register snapshot', () => {
    const { container } = render(<AuthenticateFormComponent error={error} event={event} handleChange={handleChange} isRegistered={false} invalidPassword={invalidPassword} invalidEmail={invalidEmail} spacing={"3"} />);
    expect (container.firstChild).toMatchSnapshot();
  })

  test('should render password and email fields if logging in', () => {
    render(<AuthenticateFormComponent error={error} event={event} handleChange={handleChange} isRegistered={true} invalidPassword={undefined} invalidEmail={undefined} spacing={"8"} />)
    screen.getByPlaceholderText(/Enter email/)
    screen.getByPlaceholderText(/Enter password/)
    const secondPasswordInput = screen.queryByPlaceholderText(/Repeat password/)
    expect(secondPasswordInput).not.toBeInTheDocument()
  })

  test('should render password (x2) and email fields if registering', () => {
    render(<AuthenticateFormComponent error={error} event={event} handleChange={handleChange} isRegistered={false} invalidPassword={invalidPassword} invalidEmail={invalidEmail} spacing={"3"} />)
    screen.getByPlaceholderText(/Enter email/)
    screen.getByPlaceholderText(/Enter password/)
    screen.getByPlaceholderText(/Repeat password/)
  })

  test('should render email error message when registering with invalid email but matching passwords', () => {
    render(<AuthenticateFormComponent error={error} event={event} handleChange={handleChange} isRegistered={false} invalidPassword={false} invalidEmail={true} spacing={"3"} />)
    screen.getByText(/Should be a valid email./)
    const invalidPasswordError = screen.queryByText(/Passwords should be the equal./)
    expect(invalidPasswordError).not.toBeInTheDocument()
  })

  test('should render password error message when registering with unmatching passwords but correct email', () => {
    render(<AuthenticateFormComponent error={error} event={event} handleChange={handleChange} isRegistered={false} invalidPassword={true} invalidEmail={false} spacing={"3"} />)
    screen.getByText(/Passwords should be the equal./)
    const invalidEmailError = screen.queryByText(/Should be a valid email./)
    expect(invalidEmailError).not.toBeInTheDocument()
  })

  test('should render email error message only when registering for the first time', () => {
    render(<AuthenticateFormComponent error={error} event={event} handleChange={handleChange} isRegistered={true} invalidPassword={false} invalidEmail={true} spacing={"3"} />)
    const invalidEmailError = screen.queryByText(/Should be a valid email./)
    expect(invalidEmailError).not.toBeInTheDocument()
  })

})