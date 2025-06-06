// src/components/Address/Address.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Address from './Address';

test('renders all contact entries correctly', () => {
	render(<Address />);

	// Phone number
	expect(screen.getByText('+500 342 242')).toBeInTheDocument();

	// Email
	expect(screen.getByText('office@kamsolutions.pl')).toBeInTheDocument();

	// Twitter entry
	expect(screen.getByText('Twitter')).toBeInTheDocument();
	expect(
		screen.getByText('https://twitter.com/wordpress')
	).toBeInTheDocument();

	// Facebook entry
	expect(screen.getByText('Facebook')).toBeInTheDocument();
	expect(
		screen.getByText('https://www.facebook.com/facebook')
	).toBeInTheDocument();

	// Skype entry
	expect(screen.getByText('Skype')).toBeInTheDocument();
	expect(screen.getByText('kamsolutions.pl')).toBeInTheDocument();
});
