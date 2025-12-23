import React from "react";

function Student ({ student}){
    return(
        <div style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
            <p>Student Roll No: {student.id}</p>
            <p>Name: {student.name}</p>
            <p>Date of Birth: {student.dob}</p>
            <p>Gender: {student.gender}</p>
            <p>City: {student.city}</p>
        </div>
    )
}
export default Student;