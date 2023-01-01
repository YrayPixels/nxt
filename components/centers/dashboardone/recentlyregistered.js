
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function Recentregisterd(props) {
    const { details, bearer } = props
    const { students, setStudents } = useState(' ')
    const { error, setError } = useState(' ')

    var config = {
        method: 'get',
        url: "https://stockmgt.gapaautoparts.com/api/center/getRecentRegisteredStudents",
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setStudents(data.session)
                return data;
            })
            .catch(function (error) {
                setError(error);
            });
    }
    fetchData()

    if (error != '')
        return 'An error has occured'
    if (students == ' ') return <CircularProgress />
    // console.log(data)
    return (<div>

        <div className="bg-info p-4 shadow rounded-3 table-responsive">
            <div>
                <h6 className="fw-bold">Recent Registered  Students</h6>
                <p>Done this month</p>
            </div>
            <table className="tableData table table-hover  table-striped  table-borderless">
                <thead>
                    <tr>
                        <th>STUDENT'S NAME</th>
                        <th>EMAIl</th>
                        <th>PHONE</th>
                        <th>DEPARTMENT</th>
                        <th>PROGRAMME</th>
                        <th>FACULTY</th>
                        <th>OCCUPATION</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(data => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.departments_title} </td>
                                    <td>{data.programmes_title}</td>
                                    <td>{data.faculties_title}</td>
                                    {/* <td> {data.occupation}</td> */}
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    </div>);
}

export default Recentregisterd;