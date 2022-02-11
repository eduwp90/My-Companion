import { render, screen } from '@testing-library/react';
import AuthenticateFormComponent from './authenticateFormComponent';

describe ('BasicInfoFormComponent', () => {

  //- login tests

  test ('BasicInfoFormComponent should match login snapshot', () => {
    const { container } = render(<AuthenticateFormComponent error={false} isRegistered={true} spacing={"8"} register={()=>  1 + 1} formState={{errors: {}, isDirty:false}} getValues={()=> 1+1} />);
    expect (container.firstChild).toMatchSnapshot();
  })

  test('should render password and email fields if logging in', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={true} spacing={"8"} register={()=>  1 + 1} formState={{errors: {}, isDirty:false}} getValues={()=> 1+1} />)
    screen.getByPlaceholderText(/Enter email/)
    screen.getByPlaceholderText(/Enter password/)
    const secondPasswordInput = screen.queryByPlaceholderText(/Repeat password/)
    expect(secondPasswordInput).not.toBeInTheDocument()
  })

  test('should render email error message when email is invalid', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={true} spacing={"8"} register={()=> 1 + 1} formState={{errors: {email: {message: "Must be valid email."}}, isDirty:true}} getValues={()=> 1+1} />)
    screen.getByText(/Must be valid email./)
  })

  test('should render password error message when password is invalid', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={true} spacing={"8"} register={()=> 1 + 1} formState={{errors: {password: {message: "Password is too short."}}, isDirty:true}} getValues={()=> 1+1} />)
    screen.getByText(/Password is too short./)
  })

  test('should render email error message when email is not provided', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={true} spacing={"8"} register={()=> 1 + 1} formState={{errors: {email: {message: "Email is required."}}, isDirty:true}} getValues={()=> 1+1} />)
    screen.getByText(/Email is required./)
  })

  test('should render error message when attempting to log-in with incorrect email or password', () => {
    render(<AuthenticateFormComponent error={'Invalid email or password'} isRegistered={true} spacing={"8"} register={()=> 1 + 1} formState={{errors: {}, isDirty:false}} getValues={()=> 1+1} />)
    screen.getByText(/Invalid email or password/)
  })

  //- register tests

  test ('BasicInfoFormComponent should match register snapshot', () => {
    const { container } = render(<AuthenticateFormComponent error={false} isRegistered={false} spacing={"3"} register={()=> 1 + 1} formState={{errors: {}, isDirty:false}} getValues={()=> 1+1} />);
    expect (container.firstChild).toMatchSnapshot();
  })

  test('should render password (x2) and email fields if registering', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={false} spacing={"3"} register={()=> 1 + 1} formState={{errors: {}, isDirty:false}} getValues={()=> 1+1} />)
    screen.getByPlaceholderText(/Enter email/)
    screen.getByPlaceholderText(/Enter password/)
    screen.getByPlaceholderText(/Repeat password/)
  })

  test('should render email error message when registering with invalid email', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={false} spacing={"3"} register={()=> 1 + 1} formState={{errors: {email: {message: 'Must be valid email.'}}, isDirty:true}} getValues={()=> 1+1} />)
    screen.getByText(/Must be valid email./)
    const invalidPasswordError = screen.queryByText(/Passwords should be the equal./)
    expect(invalidPasswordError).not.toBeInTheDocument()
  })

  test('should render repeat-password error message when registering with unmatching passwords', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={false} spacing={"3"} register={()=> 1 + 1} formState={{errors: {repeat: {message: 'Repeat password exactly'}}, isDirty:true}} getValues={()=> 1+1} />)
    screen.getByText(/Repeat password exactly/)
    const invalidEmailError = screen.queryByText(/Should be a valid email./)
    expect(invalidEmailError).not.toBeInTheDocument()
  })

  test('should render password error message when registering with invalid password', () => {
    render(<AuthenticateFormComponent error={false} isRegistered={false} spacing={"3"} register={()=> 1 + 1} formState={{errors: {password: {message: 'Password is too short'}}, isDirty:true}} getValues={()=> 1+1} />)
    screen.getByText(/Password is too short/)
  })

})