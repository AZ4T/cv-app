import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from '../../features/skills/skillsSlice';
import Skills from './Skills';

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

    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    const toggleButton = screen.getByRole('button', { name: /Open Edit/i });
    expect(toggleButton).toBeInTheDocument();

    expect(screen.getByText(/No skills added yet\./i)).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent(/Cancel/i);

    expect(screen.getByLabelText(/Skill Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Skill Range/i)).toBeInTheDocument();

    // Submit button is disabled initially
    expect(screen.getByRole('button', { name: /Add skill/i })).toBeDisabled();
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

    fireEvent.change(screen.getByLabelText(/Skill Name/i), {
      target: { value: 'JavaScript' },
    });
    fireEvent.change(screen.getByLabelText(/Skill Range/i), {
      target: { value: '75' },
    });

    const addButton = screen.getByRole('button', { name: /Add skill/i });
    expect(addButton).toBeEnabled();

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText(/75%$/i)).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.skills.items).toHaveLength(1);
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

    fireEvent.blur(screen.getByLabelText(/Skill Range/i));
    expect(
      await screen.findByText(/Skill range is a required field/i)
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Skill Range/i), {
      target: { value: '5' },
    });
    fireEvent.blur(screen.getByLabelText(/Skill Range/i));
    expect(
      await screen.findByText(/Skill range must be greater than or equal to 10/i)
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Skill Range/i), {
      target: { value: '150' },
    });
    fireEvent.blur(screen.getByLabelText(/Skill Range/i));
    expect(
      await screen.findByText(/Skill range must be less than or equal to 100/i)
    ).toBeInTheDocument();

    fireEvent.blur(screen.getByLabelText(/Skill Name/i));
    expect(
      await screen.findByText(/Skill name is a required field/i)
    ).toBeInTheDocument();
  });
});
