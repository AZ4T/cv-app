/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/TimeLine/TimeLine.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Reducer } from '@reduxjs/toolkit';
import TimeLine from './TimeLine';

// Helper to create a store whose 'education' slice always returns the given state
const createStore = (state: {
	items: { date: number; title: string; text: string }[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	errorMessage: string;
}) =>
	configureStore({
		reducer: {
			education: ((_: any, __: any) => state) as Reducer<
				typeof state,
				any
			>,
		},
	});

describe('TimeLine component', () => {
	test('renders loading spinner when status is "loading"', () => {
		const store = createStore({
			items: [],
			status: 'loading',
			errorMessage: '',
		});
		render(
			<Provider store={store}>
				<TimeLine />
			</Provider>
		);

		// The SVG spinner has role="img" but aria-hidden="true", so we query including hidden
		const spinner = screen.getByRole('img', { hidden: true });
		expect(spinner).toBeInTheDocument();
	});

	test('renders error message when status is "failed"', () => {
		const store = createStore({
			items: [],
			status: 'failed',
			errorMessage: 'Test error',
		});
		render(
			<Provider store={store}>
				<TimeLine />
			</Provider>
		);

		expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
		expect(screen.getByText(/Test error/i)).toBeInTheDocument();
	});

	test('renders timeline items when status is "succeeded"', () => {
		const sampleItems = [
			{ date: 2020, title: 'Degree A', text: 'Completed A' },
			{ date: 2021, title: 'Degree B', text: 'Completed B' },
		];
		const store = createStore({
			items: sampleItems,
			status: 'succeeded',
			errorMessage: '',
		});
		render(
			<Provider store={store}>
				<TimeLine />
			</Provider>
		);

		// Each item’s date, title, and text should appear
		expect(screen.getByText('2020')).toBeInTheDocument();
		expect(screen.getByText('Degree A')).toBeInTheDocument();
		expect(screen.getByText('Completed A')).toBeInTheDocument();

		expect(screen.getByText('2021')).toBeInTheDocument();
		expect(screen.getByText('Degree B')).toBeInTheDocument();
		expect(screen.getByText('Completed B')).toBeInTheDocument();
	});
});
