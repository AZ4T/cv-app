import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PhotoBox from './PhotoBox';

describe('PhotoBox component', () => {
	const commonProps = {
		name: 'John Doe',
		title: 'Programmer. Creative. Innovator',
		description: 'Lorem ipsum dolor sit amet.',
		avatar: 'https://example.com/avatar.jpg',
	};

	test('renders home view when path is "/"', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<PhotoBox {...commonProps} />} />
				</Routes>
			</MemoryRouter>
		);

		const homeImg = screen.getByRole('img', {
			name: /user avatar/i,
		}) as HTMLImageElement;
		expect(homeImg).toBeInTheDocument();
		expect(homeImg).toHaveClass('home_image');
		expect(homeImg.src).toBe(commonProps.avatar);

		const nameHeading = screen.getByRole('heading', { level: 3 });
		expect(nameHeading).toHaveTextContent(commonProps.name);
		expect(nameHeading).toHaveClass('home_name');

		const titleHeading = screen.getByRole('heading', { level: 4 });
		expect(titleHeading).toHaveTextContent(commonProps.title);
		expect(titleHeading).toHaveClass('title');

		const descPara = screen.getByText(commonProps.description);
		expect(descPara).toHaveClass('description');
	});

	test('renders inner view when path is "/inner"', () => {
		render(
			<MemoryRouter initialEntries={['/inner']}>
				<Routes>
					<Route
						path="/inner"
						element={<PhotoBox {...commonProps} />}
					/>
				</Routes>
			</MemoryRouter>
		);

		const innerImg = screen.getByRole('img', {
			name: /user avatar/i,
		}) as HTMLImageElement;
		expect(innerImg).toBeInTheDocument();
		expect(innerImg).toHaveClass('inner_image');
		expect(innerImg.src).toBe(commonProps.avatar);

		const namePara = screen.getByText(commonProps.name);
		expect(namePara).toHaveClass('inner_name');

		expect(
			screen.queryByRole('heading', { level: 3 })
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { level: 4 })
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(commonProps.description)
		).not.toBeInTheDocument();
	});
});
