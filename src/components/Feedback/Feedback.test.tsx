// src/components/Feedback/Feedback.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feedback from './Feedback';

describe('Feedback component', () => {
	const sampleData = [
		{
			reporter: {
				name: 'Jane Doe',
				photoUrl: 'https://example.com/jane.jpg',
				citeUrl: '#',
			},
			feedback: 'Great work!',
		},
		{
			reporter: {
				name: 'John Smith',
				photoUrl: 'https://example.com/john.jpg',
				citeUrl: '#',
			},
			feedback: 'Awesome!',
		},
	];

	test('renders each feedback item correctly (including <img> and reporter name)', () => {
		render(<Feedback data={sampleData} />);

		// 1) Verify there are as many author images as sample items
		const imgEls = screen.getAllByAltText(
			'author image'
		) as HTMLImageElement[];
		expect(imgEls.length).toBe(sampleData.length);

		imgEls.forEach((imgEl, index) => {
			const item = sampleData[index];

			// 2) Each <img> src matches reporter.photoUrl
			expect(imgEl).toBeInTheDocument();
			expect(imgEl.src).toBe(item.reporter.photoUrl);

			// 3) The outer wrapper <div class="wrapper"> is the closest ancestor of imgEl
			const wrapperDiv = imgEl.closest('div.wrapper');
			expect(wrapperDiv).toBeInTheDocument();

			// 4) Inside that same wrapper, the <span class="author_name"> contains reporter.name
			const nameSpan = wrapperDiv!.querySelector('span.author_name');
			expect(nameSpan).toBeInTheDocument();
			expect(nameSpan).toHaveTextContent(item.reporter.name);

			// 5) Also inside that wrapper, the <p class="text"> holds item.feedback
			const feedbackP = wrapperDiv!.querySelector('p.text');
			expect(feedbackP).toBeInTheDocument();
			expect(feedbackP).toHaveTextContent(item.feedback);
		});
	});
});
