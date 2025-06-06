// src/components/Box/Box.test.tsx
import React from 'react';
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

		// 1. The <h3> with class="title" should appear
		const heading = screen.getByRole('heading', { level: 3 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(titleText);

		// 2. Find the <p> by custom function matcher that normalizes whitespace
		const paragraph = screen.getByText((text, element) => {
			if (element?.tagName.toLowerCase() !== 'p') return false;
			// Normalize spaces/newlines
			const normalized = element.textContent?.replace(/\s+/g, ' ').trim();
			return normalized === 'Here is some important content.';
		});
		expect(paragraph).toBeInTheDocument();
		expect(paragraph.tagName.toLowerCase()).toBe('p');

		// 3. The <strong> child must also be present
		const strongNode = screen.getByText('important');
		expect(strongNode).toBeInTheDocument();
		expect(strongNode.tagName.toLowerCase()).toBe('strong');
	});

	test('applies CSS module class names to container, title, and content', () => {
		render(<Box title="Style Test" content={<span>XYZ</span>} />);

		// The container <div> is the ancestor of the <h3>
		const containerDiv = screen
			.getByRole('heading', { level: 3 })
			.closest('div');
		expect(containerDiv).toHaveClass('container');

		// The <h3> itself must have class "title"
		const titleElement = screen.getByRole('heading', { level: 3 });
		expect(titleElement).toHaveClass('title');

		// The content slot is a <div> wrapping the <span> "XYZ"
		const contentDiv = screen.getByText('XYZ').closest('div');
		expect(contentDiv).toHaveClass('content');
	});
});
