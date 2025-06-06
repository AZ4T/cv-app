// src/components/Feedback/Feedback.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feedback from './Feedback';

describe('Feedback component', () => {
	test('renders nothing when data array is empty', () => {
		const { container } = render(<Feedback data={[]} />);
		const wrappers = container.querySelectorAll('div.wrapper');
		expect(wrappers).toHaveLength(0);
	});

	test('renders each feedback item correctly (including <img>)', () => {
		const sampleData = [
			{
				feedback: 'Great work on the project!',
				reporter: {
					photoUrl: 'https://example.com/photo1.png', // must be non-empty
					name: 'Alice Johnson',
					citeUrl: 'https://alice.example.com',
				},
			},
			{
				feedback: 'Outstanding collaboration skills.',
				reporter: {
					photoUrl: 'https://example.com/photo2.png',
					name: 'Bob Smith',
					citeUrl: 'https://bob.example.com',
				},
			},
		];

		render(<Feedback data={sampleData} />);

		sampleData.forEach((item) => {
			// 1) The feedback text itself
			const feedbackNode = screen.getByText(item.feedback);
			expect(feedbackNode).toBeInTheDocument();

			// 2) Its closest ancestor <div class="wrapper">
			const wrapperDiv = feedbackNode.closest('div.wrapper');
			expect(wrapperDiv).toBeInTheDocument();
			expect(wrapperDiv).toHaveClass('wrapper');

			// 3) That wrapper must contain <div class="author">
			const authorContainer = wrapperDiv!.querySelector('div.author');
			expect(authorContainer).toBeInTheDocument();
			expect(authorContainer).toHaveClass('author');

			// 4) Inside authorContainer, find the <img class="author_image">
			const img = authorContainer!.querySelector(
				'img.author_image'
			) as HTMLImageElement;
			expect(img).toBeInTheDocument();
			expect(img).toHaveAttribute('src', item.reporter.photoUrl);
			expect(img).toHaveAttribute('alt', 'author image');

			// 5) Next, find <span class="author_name">
			const nameSpan = authorContainer!.querySelector('span.author_name');
			expect(nameSpan).toBeInTheDocument();
			expect(nameSpan).toHaveTextContent(item.reporter.name);

			// 6) Inside that span, the <a class="author_site">
			const siteLink = nameSpan!.querySelector(
				'a.author_site'
			) as HTMLAnchorElement;
			expect(siteLink).toBeInTheDocument();
			expect(siteLink).toHaveAttribute('href', item.reporter.citeUrl);
			expect(siteLink).toHaveTextContent('somesite.com');
		});
	});
});
