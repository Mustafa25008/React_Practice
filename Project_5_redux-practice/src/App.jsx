import React from 'react'
import './App.css'
import Counter from './components/counter'
import { useSelector, useDispatch } from 'react-redux';
import { setInp } from "./redux/form/inp"


function App() {

  const inputValue = useSelector((state)=>state.Form.value);
  const dispatcher = useDispatch();

  const handlesub = (e)=>{
    dispatcher(setInp(e.target.value))
    e.target.value;
  
  }
  return (
    <>
      <Counter/>
      <div>
        <label>Enter name: </label>
        <input type="text" onChange={handlesub} value={inputValue}/>
        <button>Submit</button>
        <p>Current State: {inputValue}</p>
      </div>
    </>
  )
}

export default App
