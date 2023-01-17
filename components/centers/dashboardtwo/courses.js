import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import axios from 'axios';



function AllCourses(props) {
    const { details, bearer } = props
    const [course, setCourse] = useState(' ');
    var [delay, setDelay] = useState(' ');

    const fetchData = () => {
        var config = {
            method: 'get',
            url: `https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/${details.id}`,
            headers: {
                'Authorization': `Bearer ${bearer}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        axios(config)
            .then(function (response) {
                const data = response.data;
                setCourse(data.result.reverse())
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deleteModules(param) {
        // console.log(param)
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const deleteDep = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/HideCourse/${param}`, requestOptions)
            const data = await response.json()
            // console.log(response.status)
            if (response.status == 200) {
                // setActivator('Faculty Deleted Successfully')
                Swal.fire({
                    title: 'Module Deleted Succesfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                fetchData()
            } else if (response.status == 400) {
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
            return data;
        }
        deleteDep()
    }


    useEffect(() => {
        if (course.length == 0 || course == ' ') {
            fetchData()
        }
    })
    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Modules: {course.length}</h6>
            </div>
            <table className="tableData table table-responsive table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>CODE</th>
                        <th>UNIT</th>
                        <th className='text-center'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {course == ' ' ? <p><CircularProgress /></p> :
                        course.map(data => {
                            return (
                                <tr key={data.id} className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {course.indexOf(data) + 1}</td>
                                    <td>{data.title}</td>
                                    <td>{data.code}</td>
                                    <td> {data.unit}</td>
                                    <td className='text-center'><div className='btn-group'>

                                        <button className='btn btn-primary btn-sm p-2'>
                                            <Link href={`/centers/modules/edit/${data.id}`}>
                                                Edit
                                            </Link>
                                        </button>
                                        <button onClick={() => deleteModules(`${data.id}`)} className='btn btn-sm btn-danger p-2'>
                                            Delete
                                        </button>
                                    </div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>);


}
export default AllCourses;