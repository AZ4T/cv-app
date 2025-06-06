import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

describe('Button component', () => {
	test('renders the button with given text and calls onClick when clicked', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick} text="Click me" />);

		const btn = screen.getByTestId('my-button');
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveTextContent('Click me');
		expect(btn).not.toBeDisabled();

		fireEvent.click(btn);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('renders disabled state when disabled prop is true', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick} text="Disabled" disabled />);

		const btn = screen.getByTestId('my-button');
		expect(btn).toBeDisabled();

		fireEvent.click(btn);
		expect(handleClick).not.toHaveBeenCalled();
	});

	test('renders a FontAwesomeIcon when icon prop is provided', () => {
		render(<Button icon={faCoffee} text="With Icon" />);

		const btn = screen.getByTestId('my-button');

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

		expect(btn).toHaveClass('custom-button-class');

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
