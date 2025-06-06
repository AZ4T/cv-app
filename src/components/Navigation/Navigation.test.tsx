import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation component', () => {
	test('renders all links with correct hrefs and toggles active class', () => {
		render(
			<Router>
				<Navigation />
			</Router>
		);

		const linkLabels = [
			'About me',
			'Education',
			'Experience',
			'Skills',
			'Portfolio',
			'Contacts',
			'Feedbacks',
		];
		linkLabels.forEach((label) => {
			const link = screen.getByText(label).closest('a');
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute(
				'href',
				`#${label.toLowerCase().replace(/\s+/g, '')}`
			);
		});

		// Initially, “About me” is active
		const aboutLink = screen.getByText('About me').closest('a');
		expect(aboutLink).toHaveClass('active');

		// Click “Skills”
		const skillsLink = screen.getByText('Skills').closest('a')!;
		fireEvent.click(skillsLink);
		expect(skillsLink).toHaveClass('active');
		expect(aboutLink).not.toHaveClass('active');
	});

	test('clicking a nav link scrolls into view and sets active', () => {
		// Append a dummy element with id="portfolio"
		const portfolioSection = document.createElement('div');
		portfolioSection.setAttribute('id', 'portfolio');
		document.body.appendChild(portfolioSection);

		render(
			<Router>
				<Navigation />
			</Router>
		);

		const portfolioLink = screen.getByText('Portfolio').closest('a')!;
		const scrollSpy = jest.spyOn(portfolioSection, 'scrollIntoView');

		fireEvent.click(portfolioLink);
		expect(portfolioLink).toHaveClass('active');
		expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });

		scrollSpy.mockRestore();
		document.body.removeChild(portfolioSection);
	});
});
