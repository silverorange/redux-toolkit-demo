import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import {
  counterIncrement as counterIncrementAction,
  counterDecrement as counterDecrementAction,
} from '../actions/counter';

interface CounterStateProps {
  count: number;
}

interface CounterDispatchProps {
  counterIncrement: typeof counterIncrementAction;
  counterDecrement: typeof counterDecrementAction;
}

type CounterProps = CounterStateProps & CounterDispatchProps;

export function CounterImpl({
  count,
  counterIncrement,
  counterDecrement,
}: CounterProps) {
  return (
    <div>
      <div>
        <button aria-label="Decrement value" onClick={() => counterDecrement()}>
          Decrement
        </button>
        <span>{count}</span>
        <button aria-label="Increment value" onClick={() => counterIncrement()}>
          Increment
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState): CounterStateProps => {
  return {
    count: state.counter.value,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): CounterDispatchProps => {
  return bindActionCreators(
    {
      counterIncrement: counterIncrementAction,
      counterDecrement: counterDecrementAction,
    },
    dispatch
  );
};

export const Counter = connect<
  CounterStateProps,
  CounterDispatchProps,
  {},
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(CounterImpl);
