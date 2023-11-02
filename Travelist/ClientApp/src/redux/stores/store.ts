import { configureStore } from '@reduxjs/toolkit';

import destinationSearchReducer from '../slices/destinationSearchSlice.ts';

const store = configureStore({
  reducer: {
    destinationSearch: destinationSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;