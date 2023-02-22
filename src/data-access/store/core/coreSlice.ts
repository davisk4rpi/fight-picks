import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CORE_SLICE_NAME = 'core';
// Define a type for the slice state
interface CoreState {
  currentFightCardId: string | null;
}

// Define the initial state using that type
const initialState: CoreState = {
  currentFightCardId: null,
};

const coreSlice = createSlice({
  name: CORE_SLICE_NAME,
  initialState,
  reducers: {
    setCurrentFightCardId: {
      reducer: (state, action: PayloadAction<string | null>) => {
        state.currentFightCardId = action.payload;
      },
      prepare: (id: string | null) => {
        return {
          payload: id,
        };
      },
    },
  },
});

export const coreReducer = coreSlice.reducer;
export const { setCurrentFightCardId } = coreSlice.actions;

export const selectCurrentFightCardId = (state: {
  [CORE_SLICE_NAME]: CoreState;
}) => state[CORE_SLICE_NAME].currentFightCardId;
