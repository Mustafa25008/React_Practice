import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, multiple } from "../redux/counter/counterSlice";


function Counter() {
    const count = useSelector((state)=>state.countering.value);
    const dispatcher = useDispatch();
    return (
        <div>
            This is a counter and value is {count}
            <br />
            <button onClick={()=>dispatcher(increment())}>Incre</button>
            <br />
            <button onClick={()=>dispatcher(decrement())}>Decrement</button>
            <br />
            <button onClick={()=>dispatcher(multiple())}>Multiple</button>
        </div>
    );
}
export default Counter;