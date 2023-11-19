import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/navigation/index';

describe('Navbar', () => {
  it('renders the Navbar', () => {
    render(<Navbar />);
    // Check for nav element
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
  });
});
