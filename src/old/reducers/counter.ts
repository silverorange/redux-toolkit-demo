import { CounterActionTypes, CounterActionTypeKeys } from '../actions/counter';

export interface CounterState {
  value: number;
}

const counterInitialState: CounterState = {
  value: 0,
};

export const counterReducer = (
  state: CounterState = counterInitialState,
  action: CounterActionTypes
): CounterState => {
  switch (action.type) {
    case CounterActionTypeKeys.COUNTER_INCREMENT:
      return { value: state.value + 1 };
    case CounterActionTypeKeys.COUNTER_DECREMENT:
      return { value: state.value - 1 };
    default:
      return state;
  }
};
