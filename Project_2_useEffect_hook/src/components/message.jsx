import React, { useEffect } from "react";

function Msg({ msg, setmsg }) {

  useEffect(()=>{
          const timer = setTimeout(()=>{
              setmsg({text:"", type:""});
          }, 3000);
          return ()=>{
              clearTimeout(timer);
          }
      },[msg, setmsg]);

  if (!msg.text) return null;

  return (
    <p style={{ color: msg.type === "error" ? "red" : "green" }}>
      {msg.text}
    </p>
  );
}

export default Msg;