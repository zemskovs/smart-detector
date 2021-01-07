import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

export default () => {
  //   const store = createStore({}, applyMiddleware(logger));
  return {};
};
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './exampleSlice';

export const store = configureStore({
  reducer: {
    todos: reducer,
  },
});
