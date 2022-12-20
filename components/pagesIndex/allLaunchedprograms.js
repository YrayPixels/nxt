import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link'

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM");

var requestOptions = {
    method: 'GET',
    // headers: myHeaders,
    redirect: 'follow'
};
const fetcher = async () => {
    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/GetAllLunchedProgrammeByCenterId/1", requestOptions)
    const data = await response.json()
    return data.result
}

function AllLaunchedProg() {
    const { data, error } = useSWR('launched', fetcher)
    // console.log(data)
    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
    // console.log(data)
    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All Launched Programs</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Lecturers: {data.length}</h6>
            </div>
            <table className="tableData table table-responsive table">
                <thead>
                    <tr>
                        <th>PROGRAMME NAME</th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>ANNOUNCEMENT DATE</th>
                        <th>ANNOUNCEMENT LINK</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(programme => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {programme.programme_id}</td>
                                    <td>{programme.start_date}</td>
                                    <td>{programme.end_date}</td>
                                    <td>{programme.announcement_date} </td>
                                    <td>{programme.announcement_link}</td>
                                    <td>
                                        <div className='btn-group'>
                                            <button className='btn btn-primary p-2'>
                                                Edit
                                            </button>
                                            <button className='btn btn-danger p-2'>
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