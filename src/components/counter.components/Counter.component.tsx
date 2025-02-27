import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { increment, decrement } from '../../features/counterSlice.feature';
import { sleep } from '../../utils/sleep.util';

export const Counter = () => {
  const count = useAppSelector((state) => {
    console.log('🔍 Selector: Reading current count:', state.counter.value);
    return state.counter.value;
  });
  const dispatch = useAppDispatch();

  const handleIncrement = async () => {
    console.log('🎯 Component: Increment button clicked');
    await sleep(1000); // Simulate some async work
    console.log('📤 Component: Dispatching increment action');
    dispatch(increment());
  };

  const handleDecrement = async () => {
    console.log('🎯 Component: Decrement button clicked');
    await sleep(1000); // Simulate some async work
    console.log('📤 Component: Dispatching decrement action');
    dispatch(decrement());
  };

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <h2 className='text-2xl font-bold'>Counter: {count}</h2>
      <div className='flex gap-4'>
        <button onClick={handleDecrement} className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'>
          Decrease
        </button>
        <button onClick={handleIncrement} className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'>
          Increase
        </button>
      </div>
    </div>
  );
};
