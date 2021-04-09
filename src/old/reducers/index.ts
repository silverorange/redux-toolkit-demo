import { combineReducers } from 'redux';
import { CounterState, counterReducer } from './counter';
import { PeopleState, peopleReducer } from './people';

export interface RootState {
  counter: CounterState;
  people: PeopleState;
}

export const rootReducer = combineReducers({
  people: peopleReducer,
  counter: counterReducer,
});
