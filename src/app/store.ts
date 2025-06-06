import { configureStore } from '@reduxjs/toolkit';
import educationReducer from '../features/education/educationSlice';
import skillsReducer, { fetchSkills } from '../features/skills/skillsSlice';
import localStorageMiddleware from './localStorageMiddleware';

export const store = configureStore({
	reducer: {
		education: educationReducer,
		skills: skillsReducer,
	},
	middleware: (getDefault) =>
		getDefault()
			.concat(localStorageMiddleware),
});

store.dispatch(fetchSkills());

export type AppDispatch = typeof store.dispatch;
