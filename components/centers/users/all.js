import { Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AllCenterUSersComp(props) {
    const { details, bearer } = props
    const [centerUser, setcenterUser] = useState([]);
    // const [delay, setDelay] = useState(' ');

    const fetchData = () => {
        const centerUser = `https://stockmgt.gapaautoparts.com/api/ViewAllUser/${details.id}`
        const getcenterUser = axios.post(centerUser);
        axios.all([getcenterUser,]).then(
            axios.spread((...allData) => {
                const centerUserData = allData[0].data.data.reverse();
                setcenterUser(centerUserData)
            })
        )
    }

    useEffect(() => {
        if (centerUser.length == 0) {
            fetchData()
        }
    })

    function deletecenterUser(userId) {
        Swal.fire({
            title: 'Do you want Delete User?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var urlencoded = new URLSearchParams();
                urlencoded.append("Authorization", `Bearer ${bearer}`);

                var requestOptions = {
                    method: 'POST',
                    body: urlencoded,
                    redirect: 'follow'
                };
                const deleteList = async () => {
                    const response = await fetch(`https://stockmgt.gapaautoparts.com/api/DeleteCenterUser/${userId}`, requestOptions)
                    const data = await response.json()
                    const status = response.status;
                    if (status == 200) {
                        Swal.fire({
                            title: 'User  Deleted Successfully',
                            icon: 'success',
                            confirmButtonText: 'close'
                        })
                        fetchData()
                    } else {
                        Swal.fire({
                            title: 'An Error Occured',
                            icon: 'error',
                            confirmButtonText: 'close'
                        })
                    }
                }
                deleteList()
            } else if (result.isDenied) {
                Swal.fire('User not Deleted', '', 'info')
            }
        })



    }



    return (<>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>Center Users List</p>
            <input type="text" className='col-12 col-md-6 form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0 table-responsive">
            <table className="tableData table table-striped table-sm table-hover  ">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE NUMBER</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {centerUser.length == 0 ? <p>---</p> :
                        centerUser.map(data => {
                            return (
                                <tr key={data.id} className='align-items-center '>
                                    <td>{centerUser.indexOf(data) + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone_number} </td>

                                    <td>
                                        <div className="btn-group">
                                            <button className='btn btn-sm btn-primary'>
                                                <Link href={`/centers/users/edit/${data.id}`} >
                                                    Edit
                                                </Link>
                                            </button>
                                            <button onClick={() => {
                                                deletecenterUser(data.id)
                                            }} className='btn btn-sm btn-danger'>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    </>);
}

export default AllCenterUSersComp;