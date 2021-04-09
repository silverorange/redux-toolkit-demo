import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counter';
import { peopleSlice } from './people';

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [peopleSlice.name]: peopleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
