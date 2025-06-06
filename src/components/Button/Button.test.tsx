import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button component', () => {
	test('renders the button with given text and calls onClick when clicked', () => {
		const handleClick = jest.fn();
		// Pass "Click me" as the text prop, so that the assertion matches
		render(<Button onClick={handleClick} text="Click me" />);

		const btn = screen.getByTestId('my-button');
		// Now the text content should be "Click me"
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveTextContent('Click me');
		expect(btn).not.toBeDisabled();

		// Click the button → handler should be called once
		fireEvent.click(btn);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('renders disabled state when disabled prop is true', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick} text="Disabled" disabled />);

		const btn = screen.getByTestId('my-button');
		expect(btn).toBeDisabled();

		// Clicking a disabled button should not call onClick
		fireEvent.click(btn);
		expect(handleClick).not.toHaveBeenCalled();
	});
});
