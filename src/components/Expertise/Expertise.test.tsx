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
			const companyEl = screen.getByText(item.info.company);
			expect(companyEl).toBeInTheDocument();
			expect(companyEl.tagName.toLowerCase()).toBe('h4');
			expect(companyEl).toHaveClass('company');

			const dateEl = screen.getByText(item.date);
			expect(dateEl).toBeInTheDocument();
			expect(dateEl.tagName.toLowerCase()).toBe('p');
			expect(dateEl).toHaveClass('date');

			const jobStrong = screen.getByText(item.info.job);
			expect(jobStrong).toBeInTheDocument();
			expect(jobStrong.tagName.toLowerCase()).toBe('strong');
			const jobP = jobStrong.closest('p');
			expect(jobP).toHaveClass('job');

			const descEl = screen.getByText(item.info.description);
			expect(descEl).toBeInTheDocument();
			expect(descEl.tagName.toLowerCase()).toBe('p');
			expect(descEl).toHaveClass('description');

			const wrapperDiv = companyEl.closest('div.wrapper')!;
			expect(wrapperDiv).toBeInTheDocument();
			expect(wrapperDiv).toHaveClass('wrapper');

			const leftDiv = wrapperDiv.querySelector('div.left');
			expect(leftDiv).toBeInTheDocument();

			const rightDiv = wrapperDiv.querySelector('div.right');
			expect(rightDiv).toBeInTheDocument();
		});
	});
});
