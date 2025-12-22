import React from "react";

function ShowData({ userlist }) {
  return (
    <div>
      <h1>Show Data Component</h1>
      {userlist.map((user, index) => (
        <p key={index}>
          Name: {user.name}
          <br />
          Age: {user.age}
        </p>
      ))}
    </div>
  );
}
export default ShowData;
