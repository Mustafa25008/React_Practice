import React from "react";
import { useState } from "react";
function Counter (){
    const [count, setCount] = useState(0);
    return(
        <div>
            <h2>Counter Component</h2>
            <p>This is a simple counter component.</p>
            <div>
                <p>Counter Value: {count}</p>
                <p>{(count>0)?"Counter is Active" :"Counter is Empty"}</p>
                <button onClick={()=>setCount(pre=>pre+1)}>Increment</button>
                <button onClick={()=>setCount(pre=>(pre>0)? pre-1:0)}>Decrement</button>
            </div>
        </div>
        
    );
}
export default Counter;
