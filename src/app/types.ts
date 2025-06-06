import type skillsReducer from '../features/skills/skillsSlice';
import type educationReducer from '../features/education/educationSlice';

export type RootState = {
	skills: ReturnType<typeof skillsReducer>;
	education: ReturnType<typeof educationReducer>;
};
