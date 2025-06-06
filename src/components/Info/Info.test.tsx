import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Info from './Info';

describe('Info component', () => {
	it('renders the text prop inside a <p> and applies the correct classes', () => {
		const sampleText = 'This is some informative text';

		render(<Info text={sampleText} />);

		const paragraph = screen.getByText(sampleText);
		expect(paragraph).toBeInTheDocument();

		expect(paragraph).toHaveClass('text');

		const parentDiv = paragraph.parentElement;
		expect(parentDiv).not.toBeNull();
		expect(parentDiv).toHaveClass('wrapper');
	});
});
