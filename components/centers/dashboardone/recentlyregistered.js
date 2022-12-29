
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
const fetcher = async () => {
    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/getRecentRegisteredStudents", requestOptions)
    const data = await response.json()
    return data.students
}

function Recentregisterd() {

    const { data, error } = useSWR('register', fetcher)
    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
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
                        data.map(data => {
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