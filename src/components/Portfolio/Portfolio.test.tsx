// src/components/Portfolio/Portfolio.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from './Portfolio';

describe('Portfolio component', () => {
	beforeEach(() => {
		render(<Portfolio />);
	});

	test('renders filter buttons and all portfolio images by default', () => {
		// 1) "All" / "Code" / "UI" buttons are present
		const allTab = screen.getByRole('button', { name: /All/i });
		const codeTab = screen.getByRole('button', { name: /Code/i });
		const uiTab = screen.getByRole('button', { name: /UI/i });
		expect(allTab).toBeInTheDocument();
		expect(codeTab).toBeInTheDocument();
		expect(uiTab).toBeInTheDocument();

		// 2) By default, there are 8 portfolio items (the component's internal array has 8 entries)
		const allImgs = screen.getAllByRole('img');
		expect(allImgs).toHaveLength(8);

		// Each image's alt text corresponds to its title; spot-check one
		expect(
			screen.getAllByAltText(/Some text/).length
		).toBeGreaterThanOrEqual(1);
	});

	test('clicking "UI" / "Code" toggles the active class on those buttons', () => {
		const uiTab = screen.getByRole('button', { name: /UI/i });
		const codeTab = screen.getByRole('button', { name: /Code/i });

		// Initially, "All" is active
		const allTab = screen.getByRole('button', { name: /All/i });
		expect(allTab).toHaveClass('active');
		expect(uiTab).not.toHaveClass('active');
		expect(codeTab).not.toHaveClass('active');

		// Click "UI" → that button should become active, others not
		fireEvent.click(uiTab);
		expect(uiTab).toHaveClass('active');
		expect(codeTab).not.toHaveClass('active');
		expect(allTab).not.toHaveClass('active');

		// Click "Code" → that button becomes active instead
		fireEvent.click(codeTab);
		expect(codeTab).toHaveClass('active');
		expect(uiTab).not.toHaveClass('active');
		expect(allTab).not.toHaveClass('active');
	});
});
