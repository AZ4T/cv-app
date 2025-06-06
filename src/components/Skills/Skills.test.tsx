// src/components/Skills/Skills.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from '../../features/skills/skillsSlice';
import Skills from './Skills';

// Create a “real” store with only the skills slice
function createTestStore() {
	return configureStore({
		reducer: {
			skills: skillsReducer,
		},
	});
}

describe('Skills component', () => {
	test('initially shows "No skills added yet." and can toggle form', () => {
		const store = createTestStore();
		render(
			<Provider store={store}>
				<Skills />
			</Provider>
		);

		// 1. Heading “Skills” and “Open Edit” button
		expect(
			screen.getByRole('heading', { name: /Skills/i })
		).toBeInTheDocument();
		const toggleButton = screen.getByRole('button', { name: /Open Edit/i });
		expect(toggleButton).toBeInTheDocument();

		// 2. Since no skills exist, we see “No skills added yet.”
		expect(screen.getByText(/No skills added yet\./i)).toBeInTheDocument();

		// 3. Click “Open Edit” to show the form
		fireEvent.click(toggleButton);

		// Now the button text becomes “Cancel”
		expect(toggleButton).toHaveTextContent(/Cancel/i);

		// The form fields should appear
		expect(screen.getByLabelText(/Skill Name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Skill Range/i)).toBeInTheDocument();

		// Submit button is disabled initially
		expect(
			screen.getByRole('button', { name: /Add skill/i })
		).toBeDisabled();
	});

	test('can add a valid skill and see it in the list', async () => {
		const store = createTestStore();
		render(
			<Provider store={store}>
				<Skills />
			</Provider>
		);

		const toggleButton = screen.getByRole('button', { name: /Open Edit/i });
		fireEvent.click(toggleButton);

		// Fill out the form: name="JavaScript", range="75"
		fireEvent.change(screen.getByLabelText(/Skill Name/i), {
			target: { value: 'JavaScript' },
		});
		fireEvent.change(screen.getByLabelText(/Skill Range/i), {
			target: { value: '75' },
		});

		// Now the "Add skill" button should be enabled
		const addButton = screen.getByRole('button', { name: /Add skill/i });
		expect(addButton).toBeEnabled();

		// Submit the form; wrap in act via waitFor
		fireEvent.click(addButton);
		await waitFor(() => {
			// After dispatch, the form will close (button text = "Open Edit" or skill bar appears)
			// Instead of checking the toggle button, verify the new skill appears:
			expect(screen.getByText('JavaScript')).toBeInTheDocument();
			expect(screen.getByText(/75%$/i)).toBeInTheDocument();
		});

		// Also ensure the Redux state was updated
		const state = store.getState();
		expect(state.skills.items.length).toBe(1);
		expect(state.skills.items[0].name).toBe('JavaScript');
		expect(state.skills.items[0].range).toBe(75);
	});

	test('form validation errors appear correctly', async () => {
		const store = createTestStore();
		render(
			<Provider store={store}>
				<Skills />
			</Provider>
		);

		const toggleButton = screen.getByRole('button', { name: /Open Edit/i });
		fireEvent.click(toggleButton);

		// The addButton is initially disabled
		const addButton = screen.getByRole('button', { name: /Add skill/i });
		expect(addButton).toBeDisabled();

		// a) Enter a non‐number into “Skill Range”
		fireEvent.change(screen.getByLabelText(/Skill Range/i), {
			target: { value: 'abc' },
		});
		fireEvent.blur(screen.getByLabelText(/Skill Range/i));
		expect(
			await screen.findByText(/Skill range must be a 'number' type/i)
		).toBeInTheDocument();

		// b) Enter a number below 10
		fireEvent.change(screen.getByLabelText(/Skill Range/i), {
			target: { value: '5' },
		});
		fireEvent.blur(screen.getByLabelText(/Skill Range/i));
		expect(
			await screen.findByText(
				/Skill range must be greater than or equal to 10/i
			)
		).toBeInTheDocument();

		// c) Enter a number above 100
		fireEvent.change(screen.getByLabelText(/Skill Range/i), {
			target: { value: '150' },
		});
		fireEvent.blur(screen.getByLabelText(/Skill Range/i));
		expect(
			await screen.findByText(
				/Skill range must be less than or equal to 100/i
			)
		).toBeInTheDocument();

		// d) Leave “Skill Name” blank and blur
		fireEvent.blur(screen.getByLabelText(/Skill Name/i));
		expect(
			await screen.findByText(/Skill name is a required field/i)
		).toBeInTheDocument();
	});
});
