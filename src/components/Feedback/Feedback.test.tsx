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

		const imgEls = screen.getAllByAltText(
			'author image'
		) as HTMLImageElement[];
		expect(imgEls.length).toBe(sampleData.length);

		imgEls.forEach((imgEl, index) => {
			const item = sampleData[index];

			expect(imgEl).toBeInTheDocument();
			expect(imgEl.src).toBe(item.reporter.photoUrl);

			const wrapperDiv = imgEl.closest('div.wrapper');
			expect(wrapperDiv).toBeInTheDocument();

			const nameSpan = wrapperDiv!.querySelector('span.author_name');
			expect(nameSpan).toBeInTheDocument();
			expect(nameSpan).toHaveTextContent(item.reporter.name);

			const feedbackP = wrapperDiv!.querySelector('p.text');
			expect(feedbackP).toBeInTheDocument();
			expect(feedbackP).toHaveTextContent(item.feedback);
		});
	});
});
