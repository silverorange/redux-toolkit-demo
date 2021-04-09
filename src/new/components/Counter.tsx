import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { counterSlice } from '../store/counter';

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(counterSlice.actions.decrement())}
        >
          Decrement
        </button>
        <span>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(counterSlice.actions.increment())}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
