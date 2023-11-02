import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Destination } from '../../types/destinationTypes.ts';

interface DestinationSearchState {
  isFocused: boolean;
  suggestions: Destination[];
  searchQuery: string;
}

const initialState: DestinationSearchState = {
  isFocused: false,
  suggestions: [],
  searchQuery: '',
};

const destinationSearchSlice = createSlice({
  name: 'destinationSearch',
  initialState,
  reducers: {
    setFocus: (state, action: PayloadAction<boolean>) => {
      state.isFocused = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<Destination[]>) => {
      state.suggestions = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => { 
      state.searchQuery = action.payload;
    }
  },
});

export const { setFocus, setSuggestions, setSearchQuery } = destinationSearchSlice.actions;
export default destinationSearchSlice.reducer;