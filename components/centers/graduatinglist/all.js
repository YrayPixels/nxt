import { Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AllGraduatinglist(props) {
    const { details, bearer } = props
    const [gradlist, setGradList] = useState([]);
    const [delay, setDelay] = useState(' ');

    const fetchData = () => {
        const gradlist = `https://stockmgt.gapaautoparts.com/api/GetCreateGraduatingListByCenter/${details.id}`
        const getgradlist = axios.get(gradlist);
        axios.all([getgradlist,]).then(
            axios.spread((...allData) => {
                const gradlistData = allData[0].data.data.reverse();
                setGradList(gradlistData)
                // console.log(gradlistData)
            })
        )
    }

    useEffect(() => {
        if (gradlist == [] || gradlist.length == 0) {
            fetchData()
        }
    })

    function deleteGradList(gradId) {
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const deleteList = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/DeleteCreateGraduatingList/${gradId}`, requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                Swal.fire({
                    title: 'Graduation List Deleted Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else {
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        deleteList()

        // 
        console.log(gradId)
    }

    return (<>

        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>Graduation List</p>

            <input type="text" className='col-12 col-md-6 form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0 table-responsive">
            <table className="tableData table table-striped table-sm table-hover  ">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>TITLE</th>
                        <th>SESSION</th>
                        <th>CERTIFICATE TITLE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {gradlist.length == 0 ? <tr> <p><CircularProgress /></p> </tr> :
                        gradlist.map(data => {
                            return (
                                <tr key={data.id} className='align-items-center '>
                                    <td>{gradlist.indexOf(data) + 1}</td>
                                    <td>{data.title}</td>
                                    <td>{data.session_id}</td>
                                    <td>{data.certificate} </td>

                                    <td>
                                        <div className="btn-group">
                                            <button className='btn btn-sm btn-primary'>
                                                <Link href={`/centers/graduatinglist/edit/${data.id}`} >
                                                    Edit
                                                </Link>
                                            </button>
                                            <button className='btn btn-sm btn-success'>
                                                <Link href={`/centers/graduatinglist/${data.id}`} >
                                                    View Student In List
                                                </Link>
                                            </button>
                                            <button onClick={() => {
                                                deleteGradList(data.id)
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

export default AllGraduatinglist;