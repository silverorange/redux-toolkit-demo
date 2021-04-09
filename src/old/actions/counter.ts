export enum CounterActionTypeKeys {
  COUNTER_INCREMENT = 'COUNTER_INCREMENT',
  COUNTER_DECREMENT = 'COUNTER_DECREMENT',
}

export interface CounterIncrementAction {
  type: CounterActionTypeKeys.COUNTER_INCREMENT;
}

export interface CounterDecrementAction {
  type: CounterActionTypeKeys.COUNTER_DECREMENT;
}

export type CounterActionTypes =
  | CounterIncrementAction
  | CounterDecrementAction;

export function counterIncrement(): CounterIncrementAction {
  return {
    type: CounterActionTypeKeys.COUNTER_INCREMENT,
  };
}

export function counterDecrement(): CounterDecrementAction {
  return {
    type: CounterActionTypeKeys.COUNTER_DECREMENT,
  };
}
