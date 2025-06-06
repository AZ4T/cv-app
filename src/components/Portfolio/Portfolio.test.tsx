// src/components/Portfolio/Portfolio.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from './Portfolio';

describe('Portfolio component', () => {
	test('renders filter buttons and all portfolio items by default', () => {
		render(<Portfolio />);

		// 1. Filter buttons: "All", "Code", "UI"
		const allBtn = screen.getByRole('button', { name: /^All$/i });
		const codeBtn = screen.getByRole('button', { name: /^Code$/i });
		const uiBtn = screen.getByRole('button', { name: /^UI$/i });
		expect(allBtn).toBeInTheDocument();
		expect(codeBtn).toBeInTheDocument();
		expect(uiBtn).toBeInTheDocument();

		// By default, "All" should have class="active"
		expect(allBtn).toHaveClass('active');
		expect(codeBtn).not.toHaveClass('active');
		expect(uiBtn).not.toHaveClass('active');

		// 2. The grid should contain exactly 8 <img> elements (stubbed via fileMock.js)
		const items = screen.getAllByRole('img');
		expect(items.length).toBe(8);

		// Check alt text for a few items (matching Portfolio.tsx’s titles)
		expect(screen.getByAltText('Some text')).toBeInTheDocument();
		expect(screen.getByAltText('Another one')).toBeInTheDocument();
		expect(screen.getByAltText('And again')).toBeInTheDocument();
		expect(screen.getByAltText('Last item')).toBeInTheDocument();
	});

	test('clicking "Code" and "UI" toggles the active class correctly', () => {
		render(<Portfolio />);

		const allBtn = screen.getByRole('button', { name: /^All$/i });
		const codeBtn = screen.getByRole('button', { name: /^Code$/i });
		const uiBtn = screen.getByRole('button', { name: /^UI$/i });

		// Click "Code"
		fireEvent.click(codeBtn);
		expect(codeBtn).toHaveClass('active');
		expect(allBtn).not.toHaveClass('active');
		expect(uiBtn).not.toHaveClass('active');

		// Click "UI"
		fireEvent.click(uiBtn);
		expect(uiBtn).toHaveClass('active');
		expect(allBtn).not.toHaveClass('active');
		expect(codeBtn).not.toHaveClass('active');

		// Click "All"
		fireEvent.click(allBtn);
		expect(allBtn).toHaveClass('active');
		expect(codeBtn).not.toHaveClass('active');
		expect(uiBtn).not.toHaveClass('active');
	});
});
