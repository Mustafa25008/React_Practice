import React, { useState, useEffect } from "react";
import ShowData from "./showdata";

function UseEffect() {
  const [users, setUsers] = useState({ name: "", age: "" });
  const [userlist, setUserlist] = useState([]);
  const [msg, setmsg] = useState({ text: "", type: "" });
  useEffect(() => {
    if (!msg.text) return;
    const timer = setTimeout(() => {
      setmsg({ text: "", type: "" });
    }, 2000);
    return () => clearTimeout(timer);
  }, [msg]);

  useEffect(()=>{
    const timer = setTimeout(()=>{
        setUsers({name:"",age:""});
    }, 500);
    return ()=> clearTimeout(timer);
    
  },[userlist]);

  const show = () => {
    if (users.name === "" || Number(users.age) <= 0) {
      setmsg({ text: "Please enter valid name and age", type: "error" });
      return;
    }
    setUserlist([...userlist, users]);
    setmsg({ text: "User added successfully", type: "success" });
  };

  return (
    <div>
      <div>
        <h1>UseEffect Component</h1>
        <h2>Add User</h2>
        <p style={msg.type === "error" ? { color: "red" } : { color: "green" }}>
          {msg.text}
        </p>
      </div>
      <div>
        <label name="name">Enter Name: </label>
        <input
          type="text"
          name="name"
          value={users.name}
          onChange={(e) => setUsers({ ...users, name: e.target.value })}
        />
        <br />
        <label name="age">Enter Age: </label>
        <input
          type="number"
          name="age"
          value={users.age}
          onChange={(e) => setUsers({ ...users, age: e.target.value })}
        />
        <br />
        <button onClick={show}>Add User</button>
      </div>
      {/* <ShowData userlist={userlist} /> */}
    </div>
  );
}
export default UseEffect;
