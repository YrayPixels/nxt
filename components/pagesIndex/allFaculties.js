import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';

// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM");

// var requestOptions = {
//     method: 'GET',
//     // headers: myHeaders,
//     redirect: 'follow'
// };
// const fetcher = async () => {
//     const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/1", requestOptions)
//     const data = await response.json()
//     return data.result
// }

function AllFaculties(props) {
    const { details, bearer } = props;
    const { notify, setNotify } = useState(' ');
    const { loading, setLoading } = useState(false);

    function deleteFaculty(param) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        // setLoading(true)
        // setNotify('<p><CircularProgress /></p>');
        const deletefac = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/HideFaculty/${param}`, requestOptions)
            const data = await response.json()
            // console.log(response.status)
            if (response.status == 200) {
                // setNotify('Faculty Deleted Successfully')
                Swal.fire({
                    title: 'Faculty Deleted Succesfully',
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

        }// const fetcher = async() = {
        //     const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/HideFaculty/${param}`, requestOptions)
        //     const data = await response.json()
        //     // .then(response => response.text())
        //     // .then(result => console.log(result))
        //     // .catch(error => console.log('error', error));
        // }

        deletefac()
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearer}`);
    var requestOptions = {
        method: 'GET',
        // headers: myHeaders,
        redirect: 'follow'
    };
    const fetcher = async () => {
        const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/${details.id}`, requestOptions)
        const data = await response.json()
        return data.result
    }
    const { data, error } = useSWR('faculty', fetcher)
    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
    // console.log(data)
    return (<div>
        {
            notify != ' ' ? <p>{notify}</p> : <CircularProgress />

        }
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Faculties: {data.length}</h6>
            </div>
            <table className="tableData table table-striped table-sm table-responsive table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>CODE</th>
                        <th className='text-center'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(data => {
                            return (
                                <tr className='align-items-start '>
                                    <td><span><img src="" alt="" /></span> {data.id}</td>
                                    <td>{data.title}</td>
                                    <td>{data.code}</td>
                                    <td className='text-center'><div className='btn-group '>

                                        <button className='btn btn-primary btn-sm p-2'>
                                            <Link href={`/centers/faculties/edit/${data.id}`}>
                                                Edit
                                            </Link>
                                        </button>

                                        <button onClick={() => deleteFaculty(`${data.id}`)} className='btn  btn-sm btn-danger p-2'>
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
export default AllFaculties;