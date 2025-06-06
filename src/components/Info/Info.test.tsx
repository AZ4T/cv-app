// src/components/Info/Info.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Info from './Info';

describe('Info component', () => {
	it('renders the text prop inside a <p> and applies the correct classes', () => {
		const sampleText = 'This is some informative text';

		render(<Info text={sampleText} />);

		// 1. The <p> element should contain the exact text
		const paragraph = screen.getByText(sampleText);
		expect(paragraph).toBeInTheDocument();

		// 2. The <p> should have the CSS-module class "text"
		//    (identity-obj-proxy will map styles.text → "text")
		expect(paragraph).toHaveClass('text');

		// 3. That <p> is wrapped by a <div> with class "wrapper"
		const parentDiv = paragraph.parentElement;
		expect(parentDiv).not.toBeNull();
		expect(parentDiv).toHaveClass('wrapper');
	});
});
