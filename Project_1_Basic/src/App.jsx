import { useState } from "react";
import Product from "./components/product.jsx";
import "./App.css";
import Student from "./components/student.jsx";
import Counter from "./components/counter.jsx";
function App() {
  const [rollno, setId] = useState(1);
  const [stdname, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addStudent = () => {
    if(stdname === "" || !dob || !gender || city ===""){
      setError("Please fill all the fields");
      setTimeout(()=>{
        setError("")
      },2000);
      setSuccess("");
    return;
    }
    const newStd = {
      id: rollno,
      name: stdname,
      dob: dob,
      gender: gender,
      city: city,
    };
    setStudents([...students, newStd]);
    setId(rollno + 1);
    setName("");
    setDob("");
    setGender("");
    setCity("");
    setError("");
    setSuccess("Student added successfully!");
    setTimeout(()=>{
      setSuccess("")
    },2000);
    
  };

  
  return (
    
    <div>
      <h1>Student Details</h1>
      <label>Student Name: </label>
      <input
        type="text"
        value={stdname}
        id="name"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>DOB: </label>
      <input
        type="date"
        value={dob}
        id="dob"
        onChange={(e) => setDob(e.target.value)}
      />
      <br />
      <label>Gender: </label>

<input
  type="radio"
  name="gender"
  value="Male"
  checked={gender === "Male"}
  onChange={(e) => setGender(e.target.value)}
/> Male

<input
  type="radio"
  name="gender"
  value="Female"
  checked={gender === "Female"}
  onChange={(e) => setGender(e.target.value)}
/> Female

      <br />
      <label>City: </label>
      <select name="city" id="city" value={city} onChange={(e)=> setCity(e.target.value)}>
        <option value="">Select City</option>
        <option value="Lahore">Lahore</option>
        <option value="karachi">Karachi</option>
        <option value="Islamabad">Islamabad</option>
      </select>
      <br />

      <button onClick={addStudent }
      >Add Student</button> 

      {students.map((std)=>(
        <Student key={std.id} student={std}/>
      ))}
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color:"green"}}>{success}</p>}

      <hr /><hr />
      <div><Counter /></div>
    </div>
  );
}

export default App;
