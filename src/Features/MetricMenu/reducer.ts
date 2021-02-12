import { createSlice, PayloadAction } from 'redux-starter-kit';

const initialState = {
    metricsList: [] as string[]
}

export type ApiErrorAction = {
    error: string;
};


const slice = createSlice({
    name: 'metrics',
    initialState: initialState,
    reducers: {
        metricsListRecevied: (state, action: PayloadAction<string[]>) => {
            state.metricsList = action.payload
        },
        metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,

    }
})

export const reducer = slice.reducer;
export const actions = slice.actions;