import React, {useEffect, useState} from 'react'
import "./Home.css"
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import Pagination from '../pagination/Pagination'

const Home = () => {

    let navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const fetchData = async () => {
        try{
            const res = await axios.get(`http://localhost:3003/students`);
            // console.log(res.data);
            if(res){
                setStudents(res.data.reverse())
            }
        }catch(err){
            console.warn(err);
        }
    }

    //delete data
    const deleteFun = async (id) => {
        try{
            axios.delete(`http://localhost:3003/students/${id}`);
            fetchData();
        }catch(err){
            console.warn(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const editFun = (id) => {
        navigate(`/editStudent/${id}`);
    }

    //pagination
    const [showPerPage, setShowPerPage] = useState(4);
    const [pagination, setPagination] = useState({
      start: 0,
      end: showPerPage,
    });
  
    const onPaginationChange = (start, end) => {
      setPagination({ start: start, end: end });
    };

    //search state
    const [searchItem, setSearchItem] = useState("");

    return (
        <>
            <div className="table__component">
                <div className="container">
                    <div className="search__field">
                        <input 
                            type="text" 
                            placeholder='Search...'
                            className='form-control'
                            style={{marginBottom: "20px", width: "40%"}}
                            onChange={(e) => setSearchItem(e.target.value)}
                        />
                    </div>
                    <table className="table">
                        <thead className='table-dark'>
                            <tr>
                                <th>Name</th>
                                <th>Date Of Birth</th>
                                <th>Age - Years</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-secondary'>
                            {
                                students.slice(pagination.start, pagination.end)
                                .filter((val) => {
                                    if(searchItem == ""){
                                        return val;
                                    }else if(
                                        val.username.includes(searchItem) ||
                                        val.dob.includes(searchItem) ||
                                        val.age.includes(searchItem) ||
                                        val.gender.includes(searchItem)
                                    ){
                                        return val;
                                    }
                                })
                                .map((student) => {
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.username}</td>
                                            <td>{student.dob}</td>
                                            <td className={`${student.age <= 10 ? "red" : "" }`}>{student.age}</td>
                                            <td>{student.gender}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary" onClick={() => editFun(student.id)}>Edit</button>
                                                <button type="button" className="btn btn-danger" onClick={() => deleteFun(student.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="pagination__style">
                        <Pagination
                            showPerPage={showPerPage}
                            onPaginationChange={onPaginationChange}
                            total={students.length}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
