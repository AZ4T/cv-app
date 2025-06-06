import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from './Portfolio';

describe('Portfolio component', () => {
	beforeEach(() => {
		render(<Portfolio />);
	});

	test('renders filter buttons and all portfolio images by default', () => {
		const allTab = screen.getByRole('button', { name: /All/i });
		const codeTab = screen.getByRole('button', { name: /Code/i });
		const uiTab = screen.getByRole('button', { name: /UI/i });
		expect(allTab).toBeInTheDocument();
		expect(codeTab).toBeInTheDocument();
		expect(uiTab).toBeInTheDocument();

		const allImgs = screen.getAllByRole('img');
		expect(allImgs).toHaveLength(8);

		expect(
			screen.getAllByAltText(/Some text/).length
		).toBeGreaterThanOrEqual(1);
	});

	test('clicking "UI" / "Code" toggles the active class on those buttons', () => {
		const uiTab = screen.getByRole('button', { name: /UI/i });
		const codeTab = screen.getByRole('button', { name: /Code/i });

		const allTab = screen.getByRole('button', { name: /All/i });
		expect(allTab).toHaveClass('active');
		expect(uiTab).not.toHaveClass('active');
		expect(codeTab).not.toHaveClass('active');

		fireEvent.click(uiTab);
		expect(uiTab).toHaveClass('active');
		expect(codeTab).not.toHaveClass('active');
		expect(allTab).not.toHaveClass('active');

		fireEvent.click(codeTab);
		expect(codeTab).toHaveClass('active');
		expect(uiTab).not.toHaveClass('active');
		expect(allTab).not.toHaveClass('active');
	});
});
