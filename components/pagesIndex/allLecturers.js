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
    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/getLecturerByCenterId/1", requestOptions)
    const data = await response.json()
    return data.result
}

function AllLecturers() {
    const { data, error } = useSWR('register', fetcher)
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
                <h6 className="fw-bold">Total No of Lecturers: {data.length}</h6>
            </div>
            <table className="tableData table table-responsive table">
                <thead>
                    <tr>
                        <th>LECTURER'S NAME</th>
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
                        data.map(lecturer => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {lecturer.name}</td>
                                    <td>{lecturer.email}</td>
                                    <td>{lecturer.phone}</td>
                                    <td>department </td>
                                    <td>programme</td>
                                    <td> {lecturer.occupation}</td>

                                    <td>
                                        <Link href={`/centers/lecturers/${data.indexOf(lecturer)}`} >
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
    </div >);
}
export default AllLecturers;