// src/components/Panel/Panel.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Panel from './Panel';

// Mock PhotoBox and Navigation so we don’t need to test their internals here
jest.mock('../PhotoBox/PhotoBox', () => () => (
	<div data-testid="photobox-mock" />
));
jest.mock('../Navigation/Navigation', () => () => (
	<div data-testid="navigation-mock" />
));

describe('Panel component', () => {
	test('renders collapsed and expanded states correctly', () => {
		let isCollapsed = false;
		const handleToggle = jest.fn(() => {
			isCollapsed = !isCollapsed;
		});

		// Initially render with collapsed=false
		const { rerender } = render(
			<Router>
				<Panel collapsed={isCollapsed} onToggle={handleToggle} />
			</Router>
		);

		// Because we didn’t add a role, let's query by the <aside> tag directly:
		const asideNode = document.querySelector('aside');
		expect(asideNode).toHaveClass('container');
		expect(asideNode).not.toHaveClass('collapsed');

		// PhotoBox and Navigation mocks should be in the document
		expect(screen.getByTestId('photobox-mock')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-mock')).toBeInTheDocument();

		// The Go Back button (inside a Link) should be present
		const goBackBtn = screen.getByRole('button', { name: /Go Back/i });
		expect(goBackBtn).toBeInTheDocument();

		// Click the menu toggle button to collapse
		const menuButton = asideNode!.querySelector('button');
		fireEvent.click(menuButton!);
		expect(handleToggle).toHaveBeenCalledTimes(1);

		// Re‐render with collapsed=true
		rerender(
			<Router>
				<Panel collapsed={true} onToggle={handleToggle} />
			</Router>
		);
		const collapsedAsideNode = document.querySelector('aside');
		expect(collapsedAsideNode).toHaveClass('container', 'collapsed');
	});
});
