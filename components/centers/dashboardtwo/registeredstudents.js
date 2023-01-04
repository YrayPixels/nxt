import useSWR from 'swr';
import { Avatar, CircularProgress, Input } from '@mui/material';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EmailOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

// Main Func
function StudentsList(props) {
    const { details, bearer } = props
    // const [dets, setDets] = useState({});
    // console.log(data)
    const [datali, setData] = useState(' ');
    // console.log(datali)
    function deleteStud(param) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const deleteStudent = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/HideStudent/${param}`, requestOptions)
            const data = await response.json()
            // console.log(response.status)
            if (response.status == 200) {
                // setNotify('Faculty Deleted Successfully')
                Swal.fire({
                    title: 'Student Deleted Succesfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else if (response.status == 400) {
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
            return data;

        }

        deleteStudent()
        console.log(param)
    }

    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/center/GetStudentByCenterId/${details.id}`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setData(data.students)
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchData()
    // console.log(datali)

    return (


        <div>
            <div className='d-flex align-items-center justify-content-between py-4'>
                <p>Registered Students</p>

                <input type="text" className='col-12 col-md-6 form-control w-50' placeholder='Enter Text Here...' />
            </div>
            <div className="bg-info p-4 shadow rounded-0 table-responsive">

                <div>
                    <h6 className="fw-bold">Total No of Students:  {datali.length}</h6>
                </div>
                <table className="tableData table table-striped table-sm table-hover  ">
                    <thead>
                        <tr>
                            <th>STUDENT'S NAME</th>
                            <th>EMAIl</th>
                            <th>PHONE</th>
                            <th>DEPARTMENT</th>
                            <th>PROGRAMME</th>
                            <th>FACULTY</th>
                            <th>OCCUPATION</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datali == ' ' ? <CircularProgress /> :
                            datali.map(student => {
                                return (
                                    <tr className='align-items-center '>
                                        <td><span><img src="" alt="" /></span> {student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.departments_title} </td>
                                        <td>{student.programmes_title}</td>
                                        <td>{student.faculties_title}</td>
                                        <td>{student.occupation}</td>
                                        <td className='btn-group'>
                                            <Link href={`/centers/studentlist/${student.id}`} >
                                                <button className='btn btn-sm btn-primary'>View</button>
                                            </Link>
                                            <button onClick={() => deleteStud(`${student.id}`)} className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default StudentsList;