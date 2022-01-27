import { render } from '@testing-library/react';
import ErrorMessage from './errorMessage';

describe ('ErrorMessage', () => {
  test ('ErrorMessage should match snapshot', () => {
    const { container } = render(<ErrorMessage />);
    expect (container.firstChild).toMatchSnapshot();
  })
})