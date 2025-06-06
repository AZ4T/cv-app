// src/app/localStorageMiddleware.ts
import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './types';

const localStorageMiddleware: Middleware<unknown, RootState> =
	(storeAPI) => (next) => (action) => {
		const result = next(action);

		if (
			action.type === 'skills/addSkill' ||
			action.type === 'skills/fetchSkills/fulfilled'
		) {
			const state = storeAPI.getState();
			try {
				const serialized = JSON.stringify(state.skills.items);
				localStorage.setItem('skills', serialized);
			} catch (err) {
				console.error('Failed to write skills to localStorage:', err);
			}
		}

		return result;
	};

export default localStorageMiddleware;
