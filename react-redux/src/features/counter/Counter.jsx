
import { useDispatch, useSelector } from 'react-redux'
import { decrement, decrementByAmount, increment, incrementAsync, incrementByAmount } from './counterSlice';

const Counter = () => {
    const count = useSelector((state)=>state.counter.value);
    const dispatch = useDispatch();
  return (
    <div>
        <h1>Count value: {count}</h1>
        <button onClick={()=>dispatch(increment())}>
            Increment
        </button>
        <button onClick={()=>dispatch(decrement())}>
            Decrement
        </button>
        <button onClick={()=>dispatch(incrementByAmount(5))}>
            Increment by value 5
        </button>
        <button onClick={()=>dispatch(decrementByAmount(5))}>
            Decrement by value 5
        </button>
        <button onClick={()=>dispatch(incrementAsync(count+1))}>
            Increment by value.
        </button>
    </div>
  )
}

export default Counter