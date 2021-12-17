import React from 'react'
import { useState, useEffect } from 'react'
import "./EditStudent.css"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
    let navigate = useNavigate();
    const {id} = useParams();

    const [students, setStudents] = useState({
        username: "",
        dob: "",
        age: "",
        gender: ""
    });
    // console.log(students);

    //fetch particulat data
    const loadData = async () => {
        try{
            const result = await axios.get(`http://localhost:3003/students/${id}`);
            if(result){
                setStudents(result.data);
            }
        }catch(err){
            console.warn(err);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    //update the data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await axios.put(`http://localhost:3003/students/${id}`, students);
            if(result){
                navigate("/");
            }
        }catch(err){
            console.warn(err);
        }
    }


    const inputChangeHandler = (e) => {
        setStudents({...students, [e.target.name]: e.target.value});
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
                            <button type="submit" className="btn btn-primary">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditStudent

