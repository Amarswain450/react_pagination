import React, {useState} from 'react';
import "./Navigation.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';

const Navigation = () => {
    let navigate = useNavigate();


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                setShow(false);
            }
        }catch(err){
            console.warn(err);
        }
    }

    const {username, dob, age, gender} = students;
    return (
        <>
            <nav className="navbar navbar-expand-lg py-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Students</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/* <button type="button" className="btn btn-outline-success" onClick={navigateFun}>Add New</button> */}
                                <Button className="btn btn-outline-success" onClick={handleShow}>
                                    Add New
                                </Button>
                                <Modal className="modal__style" show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add New Student</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
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
                                    </Modal.Body>
                                </Modal>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigation
