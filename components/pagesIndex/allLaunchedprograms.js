import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link'
import { useState } from 'react';
import Swal from 'sweetalert2';



function AllLaunchedProg(props) {
    const { details, bearer } = props
    const [launchedCourse, setLaunchedCourse] = useState(' ')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearer}`);

    var requestOptions = {
        method: 'GET',
        // headers: myHeaders,
        redirect: 'follow'
    };
    const fetcher = async () => {
        const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/GetAllLunchedProgrammeByCenterId/${details.id}`, requestOptions)
        const data = await response.json()
        setLaunchedCourse(data.result)
        return data.result
    }
    function hideSession(param) {
        console.log(param)
        // console.log(bearer_key)
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);
        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const fetcher = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/HideLunchedProgramme/${param}`, requestOptions)
            const data = await response.json()
            // setLoading(false)
            if (response.status == 200) {
                Swal.fire({
                    title: 'Courses Deleted Succesfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            }
            return data;

        }
        fetcher()
    }

    fetcher()

    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All Launched Courses</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0  table-responsive ">

            <div>
                <h6 className="fw-bold">Total No of Launched Courses: {launchedCourse.length}</h6>
            </div>
            <table className="tableData table-hover table-striped table">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>COURSES NAME</th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>ANNOUNCEMENT DATE</th>
                        <th>ANNOUNCEMENT LINK</th>
                        <th>OTHER MEDIA LINK</th>
                        <th>SESSION</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {launchedCourse == ' ' ? <p><CircularProgress /></p> :
                        launchedCourse.map(programme => {
                            return (
                                <tr className='align-items-center '>
                                    <td>{launchedCourse.indexOf(programme) + 1}</td>
                                    <td>{programme.title}</td>
                                    <td>{programme.start_date}</td>
                                    <td>{programme.end_date}</td>
                                    <td>{programme.announcement_date} </td>
                                    <td>{programme.announcement_link}</td>
                                    <td>{programme.other_media_link}</td>
                                    <td>{programme.session}</td>
                                    <td>{programme.programme_lunched_id}</td>
                                    <td>
                                        <div className='btn-group'>
                                            <button className='btn btn-primary p-2'>
                                                Edit
                                            </button>
                                            <button onClick={() =>
                                                hideSession(`${programme.programme_lunched_id}`)} className='btn btn-danger p-2'>
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
export default AllLaunchedProg;