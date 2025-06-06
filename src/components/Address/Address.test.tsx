import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Address from './Address';

test('renders all contact entries correctly', () => {
	render(<Address />);

	expect(screen.getByText('+500 342 242')).toBeInTheDocument();

	expect(screen.getByText('office@kamsolutions.pl')).toBeInTheDocument();

	expect(screen.getByText('Twitter')).toBeInTheDocument();
	expect(
		screen.getByText('https://twitter.com/wordpress')
	).toBeInTheDocument();

	expect(screen.getByText('Facebook')).toBeInTheDocument();
	expect(
		screen.getByText('https://www.facebook.com/facebook')
	).toBeInTheDocument();

	expect(screen.getByText('Skype')).toBeInTheDocument();
	expect(screen.getByText('kamsolutions.pl')).toBeInTheDocument();
});
