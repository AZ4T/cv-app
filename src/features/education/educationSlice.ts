import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from '@reduxjs/toolkit';

type EducationItem = {
	date: number;
	title: string;
	text: string;
};

type EducationInitialState = {
	items: EducationItem[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	errorMessage: string;
};

const initialState: EducationInitialState = {
	items: [],
	status: 'idle',
	errorMessage: '',
};

export const fetchEducations = createAsyncThunk<
	EducationItem[],
	void,
	{ rejectValue: string }
>('education/fetchEducations', async (_, thunkAPI) => {
	try {
		const response = await fetch('/api/educations');
		if (!response.ok) {
			return thunkAPI.rejectWithValue('Server responded with an error');
		}
		const items: { data: EducationItem[] } = await response.json();
		return items.data;
	} catch (err) {
		console.log(err);
		return thunkAPI.rejectWithValue('Network error: could not fetch data');
	}
});

const educationSlice = createSlice({
	name: 'education',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEducations.pending, (state) => {
				state.status = 'loading';
				state.errorMessage = '';
			})
			.addCase(
				fetchEducations.fulfilled,
				(state, action: PayloadAction<EducationItem[]>) => {
					state.status = 'succeeded';
					state.items = action.payload;
				}
			)
			.addCase(fetchEducations.rejected, (state, action) => {
				state.status = 'failed';
				state.errorMessage = action.payload || 'Something went wrong';
			});
	},
});

export default educationSlice.reducer;
