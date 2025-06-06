import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Panel from './Panel';

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

		const { rerender } = render(
			<Router>
				<Panel collapsed={isCollapsed} onToggle={handleToggle} />
			</Router>
		);

		const asideNode = document.querySelector('aside');
		expect(asideNode).toHaveClass('container');
		expect(asideNode).not.toHaveClass('collapsed');

		expect(screen.getByTestId('photobox-mock')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-mock')).toBeInTheDocument();

		const goBackBtn = screen.getByRole('button', { name: /Go Back/i });
		expect(goBackBtn).toBeInTheDocument();

		const menuButton = asideNode!.querySelector('button');
		fireEvent.click(menuButton!);
		expect(handleToggle).toHaveBeenCalledTimes(1);

		rerender(
			<Router>
				<Panel collapsed={true} onToggle={handleToggle} />
			</Router>
		);
		const collapsedAsideNode = document.querySelector('aside');
		expect(collapsedAsideNode).toHaveClass('container', 'collapsed');
	});
});
