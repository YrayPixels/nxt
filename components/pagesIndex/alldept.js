import { CircularProgress, Input } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr'
// import { useSWR } from 'swr';



function AllDepartment(props) {
    const { details, bearer } = props
    const [department, setDepartment] = useState(' ');

    function deleteDept(param) {
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

    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByCenterId/${details.id}`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setDepartment(data.result)
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchData()

    return (<div>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Departments: {department.length}</h6>
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
                    {department == ' ' ? <p><CircularProgress /> </p> :
                        department.map(data => {
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