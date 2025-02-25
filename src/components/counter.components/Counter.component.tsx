import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { increment, decrement } from '../../features/counterSlice.feature';

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Counter: {count}</h2>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(decrement())}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          Decrease
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          Increase
        </button>
      </div>
    </div>
  );
}; 