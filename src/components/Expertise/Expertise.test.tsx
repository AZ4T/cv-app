// src/components/Expertise/Expertise.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Expertise from './Expertise';

describe('Expertise component', () => {
	const sampleData = [
		{
			date: 'Jan 2020 - Dec 2021',
			info: {
				company: 'Acme Corp',
				job: 'Frontend Developer',
				description: 'Built responsive web applications.',
			},
		},
		{
			date: 'Feb 2022 - Present',
			info: {
				company: 'Beta LLC',
				job: 'Full Stack Engineer',
				description: 'Developing end-to-end features.',
			},
		},
	];

	test('renders nothing when data is an empty array', () => {
		const { container } = render(<Expertise data={[]} />);
		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
		expect(section).toBeEmptyDOMElement();
	});

	test('renders each item with correct structure and content', () => {
		render(<Expertise data={sampleData} />);

		sampleData.forEach((item) => {
			// Company name <h4 class="company">
			const companyEl = screen.getByText(item.info.company);
			expect(companyEl).toBeInTheDocument();
			expect(companyEl.tagName.toLowerCase()).toBe('h4');
			expect(companyEl).toHaveClass('company');

			// Date <p class="date">
			const dateEl = screen.getByText(item.date);
			expect(dateEl).toBeInTheDocument();
			expect(dateEl.tagName.toLowerCase()).toBe('p');
			expect(dateEl).toHaveClass('date');

			// Job <strong> inside a <p class="job">
			const jobStrong = screen.getByText(item.info.job);
			expect(jobStrong).toBeInTheDocument();
			expect(jobStrong.tagName.toLowerCase()).toBe('strong');
			const jobP = jobStrong.closest('p');
			expect(jobP).toHaveClass('job');

			// Description <p class="description">
			const descEl = screen.getByText(item.info.description);
			expect(descEl).toBeInTheDocument();
			expect(descEl.tagName.toLowerCase()).toBe('p');
			expect(descEl).toHaveClass('description');

			// Now locate the wrapper <div class="wrapper">
			// Note the non-null assertion `!` to satisfy TypeScript
			const wrapperDiv = companyEl.closest('div.wrapper')!;
			expect(wrapperDiv).toBeInTheDocument();
			expect(wrapperDiv).toHaveClass('wrapper');

			// Inside wrapper, find .left and .right
			const leftDiv = wrapperDiv.querySelector('div.left');
			expect(leftDiv).toBeInTheDocument();

			const rightDiv = wrapperDiv.querySelector('div.right');
			expect(rightDiv).toBeInTheDocument();
		});
	});
});
