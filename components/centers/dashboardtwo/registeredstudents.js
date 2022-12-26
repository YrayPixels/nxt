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

    const handleSelection = async (event, param) => {
        // console.log(id)
        const fetchData = () => {
            const activestudent = `https://stockmgt.gapaautoparts.com/api/center/ViewStudent/${param}`
            const getactivestudent = axios.get(activestudent);
            axios.all([getactivestudent]).then(
                axios.spread((...allData) => {
                    const activestudentData = allData[0].data.students;
                    setActiveStdent(activestudentData)
                    // console.log(activestudentData)
                })
            )
        }
        fetchData()
        setVisible(!visible)
        // console.log(fetchData())
        // useEffect(() => {
        //     fetchData()
        // }, [])

    }

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
                                        <button onClick={event => handleSelection(event, student.id)} className='btn btn-primary'>View</button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>

        <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
                <CModalTitle>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <div className='fw-bold'>
                                {activeStudents.name
                                }
                            </div>
                            <span><EmailOutlined /> {activeStudents.email}</span>
                        </div>
                    </div>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div>
                    <div className='row g-2 '>
                        <div className='col-5'> <span>Email: {activeStudents.email}</span></div>
                        <div className='col-5'> <span>Phone: {activeStudents.phone}</span></div>
                        <div className='col-5'> <span>Address: {activeStudents.address}</span></div>
                        <div className='col-5'> <span>Faculty: {activeStudents.faculty_id}</span></div>
                        <div className='col-5'> <span>Department: {activeStudents.department_id}</span></div>
                        <div className='col-5'> <span>Programme: {activeStudents.programme_id}</span></div>
                        <div className='col-5'> <span>State: {activeStudents.state_id}</span></div>
                        <div className='col-5'> <span>LGA: {activeStudents.lga_id}</span></div>
                        <div className='col-5'> <span>Occupation: {activeStudents.occupation}</span></div>
                        <div className='col-5'> <span>Highest Qualification: {activeStudents.heighest_qualification}</span></div>
                        <div className='col-5'> <span>Center: {activeStudents.center_id}</span></div>
                        <div className='col-5'> <span>Nationality: {activeStudents.nationality_id}</span></div>
                        <div className='col-5'> <span>Age: {activeStudents.age}</span></div>
                        <div className='col-5'> <span>Employment Status: {activeStudents.employment_status}</span></div>
                        <div className='col-5'> <span>Gender: {activeStudents.sex}</span></div>
                    </div>
                </div>
            </CModalBody>
            <CModalFooter>
                <button className='btn btn-primary' onClick={() => setVisible(false)}>Close</button>

            </CModalFooter>
        </CModal>
    </div>);
}

export default StudentsList;