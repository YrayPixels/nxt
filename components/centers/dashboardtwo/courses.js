import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';



function AllCourses(props) {
    const { details, bearer } = props
    const { activator, setActivator } = useState(' ')
    // console.log(details.id)

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
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearer}`);

    var requestOptions = {
        method: 'GET',
        // headers: myHeaders,
        redirect: 'follow'
    };
    const fetcher = async () => {
        const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/${details.id}`, requestOptions)
        const data = await response.json()
        return data.result
    }
    useEffect(() => {
        fetcher()

    }, [activator])
    fetcher()
    const { data, error } = useSWR('fetcher', fetcher)
    // console.log(data)
    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
    // console.log(data)

    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Modules: {data.length}</h6>
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
                    {
                        data.map(data => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {data.id}</td>
                                    <td>{data.title}</td>
                                    <td>{data.code}</td>
                                    <td> {data.unit}</td>
                                    <td className='text-center'><div className='btn-group'>

                                        <button className='btn btn-primary btn-sm p-2'>
                                            <Link href={`/centers/courses/edit/${data.id}`}>
                                                Edit
                                            </Link>
                                        </button>
                                        <button onClick={() => deleteModules(`${data.id}`)} className='btn btn-sm btn-danger p-2'>
                                            Delete
                                        </button>
                                        <button className='btn btn-sm btn-success'>
                                            Start Course
                                        </button>
                                        <button className='btn btn-sm btn-dark'>
                                            Add Attendees
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