import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM");

var requestOptions = {
    method: 'GET',
    // headers: myHeaders,
    redirect: 'follow'
};
const fetcher = async () => {
    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/1", requestOptions)
    const data = await response.json()
    return data.result
}

function AllCourses() {
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
                <h6 className="fw-bold">Total No of Courses: {data.length}</h6>
            </div>
            <table className="tableData table table-responsive table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>CODE</th>
                        <th>UNIT</th>
                        <th>ACTIONS</th>
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
                                    <td><button className='btn btn-primary'>View</button></td>
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