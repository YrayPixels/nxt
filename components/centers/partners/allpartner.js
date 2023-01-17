import useSWR from 'swr';
import { CircularProgress, Input } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';



function AllPartners(props) {
    const { details, bearer } = props;
    const { notify, setNotify } = useState(' ');
    const { loading, setLoading } = useState(false);
    const [partners, setPartners] = useState(' ')

    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/viewAllAcademicPartners/${details.id}`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setPartners(data.data.reverse())
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deletepartners(param) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const deletefac = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/deleteAcademicPartners/${param}`, requestOptions)
            const data = await response.json()
            // console.log(response.status)
            if (response.status == 200) {
                // setNotify('partners Deleted Successfully')
                Swal.fire({
                    title: 'Partners Deleted Succesfully',
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

        deletefac()
    }



    useEffect(() => {
        if (partners.length == 0 || partners == ' ') {
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
        <div className="bg-info p-4 shadow rounded-0">

            <div>
                <h6 className="fw-bold">Total No of Partners: {partners.length}</h6>
            </div>
            <table className="tableData table table-striped table-sm table-responsive table">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th className='text-center'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {partners == ' ' ? <p><CircularProgress /></p> :
                        partners.map(data => {
                            return (
                                <tr className='align-items-start '>

                                    <td><span><img src="" alt="" /></span>  {partners.indexOf(data) + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.type}</td>
                                    <td className='text-center'><div className='btn-group '>

                                        <button className='btn btn-primary btn-sm p-2'>
                                            <Link href={`/centers/partners/edit/${data.id}`}>
                                                Edit
                                            </Link>
                                        </button>
                                        <button onClick={() => deletepartners(`${data.id}`)} className='btn  btn-sm btn-danger p-2'>
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
export default AllPartners;