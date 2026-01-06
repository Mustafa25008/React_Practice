import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './counter/counterSlice';
import FormReducer from './form/inp';

export const store = configureStore({
  reducer: {
    countering: CounterReducer,
    Form: FormReducer
  },
})