import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios';



function AllLecturers(props) {
    const { details, bearer } = props
    const [delay, setDelay] = useState(' ')
    const [lecturers, setLecturers] = useState(' ')
    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/center/getLecturerByCenterId/${details.id}`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setLecturers(data.result)
                // console.log(data)
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (lecturers.length == 0 || lecturers == ' ') {

            fetchData()
        }
    })
    // console.log(lecturers)
    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0 table-responsive">

            <div>
                <h6 className="fw-bold">Total No of Lecturers: {lecturers.length}</h6>
            </div>
            <table className="tableData table table-sm  table-striped table-hover">
                <thead>
                    <tr>
                        <th>LECTURER'S NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>DEPARTMENT</th>
                        <th>PROGRAMME</th>
                        <th>OCCUPATION</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {lecturers == ' ' ? <p> <CircularProgress /></p> :
                        lecturers.map(lecturer => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {lecturer.name}</td>
                                    <td>{lecturer.email}</td>
                                    <td>{lecturer.phone}</td>
                                    <td>department</td>
                                    <td>programme</td>
                                    <td> {lecturer.occupation}</td>

                                    <td >
                                        <div className='btn-group'>

                                            <button className='btn btn-sm btn-primary'>
                                                <Link href={`/centers/lecturers/${lecturer.id}`} >
                                                    View
                                                </Link>
                                            </button>

                                            <button className='btn btn-sm btn-danger'>
                                                Delete
                                            </button>
                                        </div>


                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    </div >);
}
export default AllLecturers;