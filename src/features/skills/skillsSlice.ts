import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type SkillItem = {
	id: string;
	name: string;
	range: number;
};

type SkillInitialState = {
	items: SkillItem[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	errorMessage: string | null;
};

const initialState: SkillInitialState = {
	items: [],
	status: 'idle',
	errorMessage: null,
};

export const fetchSkills = createAsyncThunk<
	SkillItem[],
	void,
	{ rejectValue: string }
>('skills/fetchSkills', async (_, thunkAPI) => {
	try {
		const stored = localStorage.getItem('skills');
		if (stored) {
			const parsed: SkillItem[] = JSON.parse(stored);
			return parsed;
		} else {
			return [];
		}
	} catch (err) {
		console.log(err);
		return thunkAPI.rejectWithValue(
			'Failed to load skills from localStorage'
		);
	}
});

const skillsSlice = createSlice({
	name: 'skills',
	initialState,
	reducers: {
		addSkill(state: SkillInitialState, action: { payload: SkillItem }) {
			state.items.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSkills.pending, (state) => {
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchSkills.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchSkills.rejected, (state, action) => {
				state.status = 'failed';
				state.errorMessage = action.payload ?? 'Could not load saved skills.';
			});
	},
});

export const { addSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
