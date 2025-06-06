// src/components/Button/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

describe('Button component', () => {
	test('renders the button with given text and calls onClick when clicked', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick} text="Click me" />);

		// The <button> should have data-testid="my-button"
		const btn = screen.getByTestId('my-button');
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

	test('renders a FontAwesomeIcon when icon prop is provided', () => {
		// Pass faCoffee as the icon prop
		render(<Button icon={faCoffee} text="With Icon" />);

		const btn = screen.getByTestId('my-button');
		// The button should contain an <svg> (FontAwesomeIcon) and the text
		const svg = btn.querySelector('svg');
		expect(svg).toBeInTheDocument();
		expect(btn).toHaveTextContent('With Icon');
	});

	test('applies custom classNameButton and classNameText correctly', () => {
		render(
			<Button
				text="Styled"
				classNameButton="custom-button-class"
				classNameText="custom-text-class"
			/>
		);

		const btn = screen.getByTestId('my-button');
		// The top-level <button> should have both the SCSS class and the custom one
		expect(btn).toHaveClass('custom-button-class');

		// The <span> inside the button should have the text and the custom text class
		const span = btn.querySelector('span');
		expect(span).toHaveClass('custom-text-class');
		expect(span).toHaveTextContent('Styled');
	});

	test('renders correctly when no onClick is provided (no error when clicked)', () => {
		// Even if onClick is undefined, clicking should not throw
		render(<Button text="No Click" />);
		const btn = screen.getByTestId('my-button');
		expect(btn).toBeInTheDocument();

		// Fire click; since onClick is undefined, nothing happens but no error is thrown
		fireEvent.click(btn);
		expect(btn).toHaveTextContent('No Click');
	});
});
