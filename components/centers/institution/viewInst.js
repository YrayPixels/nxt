import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';



function ViewInstitutes(props) {
    const { details, bearer } = props;
    const { notify, setNotify } = useState(' ');
    const { loading, setLoading } = useState(false);
    const [faculty, setFaculty] = useState(' ')
    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/getInstitutionByCenterId/${details.id}`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setFaculty(data.institutions)
                // console.log(data)
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function deleteInst(param) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const deleteInstitute = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/HideInstitution/${param}`, requestOptions)
            const data = await response.json()
            // console.log(response.status)
            if (response.status == 200) {
                // setNotify('Faculty Deleted Successfully')
                Swal.fire({
                    title: 'Institution Deleted Succesfully',
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

        deleteInstitute()
    }

    console.log(faculty)

    useEffect(() => {
        if (faculty == ' ' || faculty.length == 0) {
            fetchData()

        }
    })
    return (<div>
        {
            notify != ' ' ? <p>{notify}</p> : <CircularProgress />

        }
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All</p>

            <input type="text" className='form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 table-responsive  shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Institutions: {faculty.length}</h6>
            </div>
            <table className="tableData table table-striped table-sm table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className='text-start'>Name</th>
                        <th className='text-center'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {faculty == ' ' ? <p><CircularProgress /></p> :
                        faculty.map(data => {
                            return (
                                <tr key={data.id} className='align-items-start '>
                                    <td><span><img src="" alt="" /></span> {faculty.indexOf(data) + 1}</td>
                                    <td>{data.name}</td>
                                    <td className='text-center'><div className='btn-group '>

                                        {/* <button className='btn btn-primary btn-sm p-2'>
                                            <Link href={`/centers/faculties/edit/${data.id}`}>
                                                Edit
                                            </Link>
                                        </button> */}

                                        <button onClick={() => deleteInst(`${data.id}`)} className='btn  btn-sm btn-danger p-2'>
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
export default ViewInstitutes;