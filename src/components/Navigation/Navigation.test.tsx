import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './Navigation';

describe('Navigation component', () => {
	beforeEach(() => {
		[
			'about',
			'education',
			'experience',
			'skills',
			'portfolio',
			'contacts',
			'feedbacks',
		].forEach((id) => {
			const section = document.createElement('div');
			section.id = id;

			section.scrollIntoView = jest.fn();
			document.body.appendChild(section);
		});

		render(<Navigation />);
	});

	test('renders all links with correct hrefs and labels', () => {
		const labelToHref: Record<string, string> = {
			'About me': '#about',
			Education: '#education',
			Experience: '#experience',
			Skills: '#skills',
			Portfolio: '#portfolio',
			Contacts: '#contacts',
			Feedbacks: '#feedbacks',
		};

		Object.entries(labelToHref).forEach(([label, href]) => {
			const link = screen.getByText(label).closest('a');
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', href);
		});
	});

	test('clicking a link toggles the active class on that link', () => {
		const aboutLink = screen.getByText('About me').closest('a')!;
		expect(aboutLink).toHaveClass('active');

		const educationLink = screen.getByText('Education').closest('a')!;
		fireEvent.click(educationLink);
		expect(educationLink).toHaveClass('active');
		expect(aboutLink).not.toHaveClass('active');

		const skillsLink = screen.getByText('Skills').closest('a')!;
		fireEvent.click(skillsLink);
		expect(skillsLink).toHaveClass('active');
		expect(educationLink).not.toHaveClass('active');
	});
});
