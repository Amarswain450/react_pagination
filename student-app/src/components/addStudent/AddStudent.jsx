import React from 'react'
import { useState } from 'react'
import "./AddStudent.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    let navigate = useNavigate();

    const [students, setStudents] = useState({
        username: "",
        dob: "",
        age: "",
        gender: ""
    });
    // console.log(students);

    const inputChangeHandler = (e) => {
        setStudents({...students, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await axios.post(`http://localhost:3003/students`, students);
            if(result){
                navigate("/");
            }
        }catch(err){
            console.warn(err);
        }
    }

    const {username, dob, age, gender} = students;
    return (
        <>
            <div className="addStudent__component">
                <div className="container">
                    <div className="addStudent__form">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder='Enter Name'
                                    name='username'
                                    value={username}
                                    onChange={inputChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder='Enter DOB'
                                    name='dob'
                                    value={dob}
                                    onChange={inputChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder='Enter Age'
                                    name='age'
                                    value={age}
                                    onChange={inputChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder='Enter Gender'
                                    name='gender'
                                    value={gender}
                                    onChange={inputChangeHandler}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddStudent
