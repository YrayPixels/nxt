import useSWR from 'swr';
import { Avatar, CircularProgress, Input } from '@mui/material';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EmailOutlined } from '@mui/icons-material';
import Link from 'next/link';

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
const fetcher = async () => {
    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/getAllStudents", requestOptions)
    const data = await response.json()
    return data.students
}
// Main Func
function StudentsList() {
    // const [activeId, setActiveId] = useState('')
    const [visible, setVisible] = useState(false)
    const [activeStudents, setActiveStdent] = useState([])
    const { data, error } = useSWR('register', fetcher)

    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>Registered Students</p>
            {/* <Input fullWidth
                classes={
                    'form-control'
                }
                placeholder="Enter text here..." /> */}
            <input type="text" className='col-12 col-md-6 form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0 table-responsive">

            <div>
                <h6 className="fw-bold">Total No of Students:  {data.length}</h6>
                <p>Done this month</p>
            </div>
            <table className="tableData table table-striped table-sm table-hover  ">
                <thead>
                    <tr>
                        <th>STUDENT'S NAME</th>
                        <th>EMAIl</th>
                        <th>PHONE</th>
                        <th>DEPARTMENT</th>
                        <th>PROGRAMME</th>
                        <th>OCCUPATION</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(student => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>department </td>
                                    <td>programme</td>
                                    <td> {student.occupation}</td>
                                    <td>
                                        <Link href={`/centers/studentlist/${student.id}`} >
                                            <button className='btn btn-primary'>View</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    </div>);
}

export default StudentsList;