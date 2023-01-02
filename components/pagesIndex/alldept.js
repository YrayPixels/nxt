import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr'
// import { useSWR } from 'swr';



function AllDepartment(props) {
    const { details, bearer } = props

    function deleteDept(param) {
        console.log(param)
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        // const deleteDep = async () => {
        //     const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/HideFaculty/${param}`, requestOptions)
        //     const data = await response.json()
        //     // console.log(response.status)
        //     if (response.status == 200) {
        //         // setNotify('Faculty Deleted Successfully')
        //         Swal.fire({
        //             title: 'Faculty Deleted Succesfully',
        //             icon: 'success',
        //             confirmButtonText: 'close'
        //         })
        //     } else if (response.status == 400) {
        //         Swal.fire({
        //             title: 'An Error Occured',
        //             icon: 'error',
        //             confirmButtonText: 'close'
        //         })
        //     }
        //     return data;

        // }

        // deleteDep()


    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearer}`);

    var requestOptions = {
        method: 'GET',
        // headers: myHeaders,
        redirect: 'follow'
    };
    const fetcher = async () => {
        const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByCenterId/${details.id}`, requestOptions)
        const data = await response.json()
        return data.result
    }

    // useEffect(() => {
    //     fetcher()
    // }, [])
    const { data, error } = useSWR('register', fetcher)
    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Departments: {data.length}</h6>
            </div>
            <table className="tableData table table-sm table-striped table-responsive table">
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
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {data.id}</td>
                                    <td>{data.title}</td>
                                    <td>{data.code}</td>
                                    <td className='text-center'><div className='btn-group'>
                                        <button className='btn btn-primary btn-sm p-2'>
                                            <Link href={`/centers/department/edit/${data.id}`}>
                                                Edit
                                            </Link>

                                        </button>
                                        <button onClick={() => deleteDept(`${data.id}`)} className='btn btn-sm btn-danger p-2'>
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
export default AllDepartment;