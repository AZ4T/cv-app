import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Box from './Box';

describe('Box component', () => {
	test('renders the title and content correctly', () => {
		const titleText = 'Test Box Title';
		const contentMarkup = (
			<p>
				Here is some <strong>important</strong> content.
			</p>
		);

		render(<Box title={titleText} content={contentMarkup} />);

		const heading = screen.getByRole('heading', { level: 3 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(titleText);

		const paragraph = screen.getByText((text, element) => {
			if (element?.tagName.toLowerCase() !== 'p') return false;
			const normalized = element.textContent?.replace(/\s+/g, ' ').trim();
			return normalized === 'Here is some important content.';
		});
		expect(paragraph).toBeInTheDocument();
		expect(paragraph.tagName.toLowerCase()).toBe('p');

		const strongNode = screen.getByText('important');
		expect(strongNode).toBeInTheDocument();
		expect(strongNode.tagName.toLowerCase()).toBe('strong');
	});

	test('applies CSS module class names to container, title, and content', () => {
		render(<Box title="Style Test" content={<span>XYZ</span>} />);

		const containerDiv = screen
			.getByRole('heading', { level: 3 })
			.closest('div');
		expect(containerDiv).toHaveClass('container');

		const titleElement = screen.getByRole('heading', { level: 3 });
		expect(titleElement).toHaveClass('title');

		const contentDiv = screen.getByText('XYZ').closest('div');
		expect(contentDiv).toHaveClass('content');
	});
});
