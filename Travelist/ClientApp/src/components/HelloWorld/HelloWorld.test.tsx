import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HelloWorld from './HelloWorld.tsx';

test('Renders the text Hello world', () => {
  render(<HelloWorld />);
  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});