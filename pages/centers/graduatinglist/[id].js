import { Edit, Email, Phone } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AllNavs from "../../../components/allNavs";
import NewtopNAv from "../../../components/centers/dashboardtwo/newtopNav";
import Secondnav from "../../../components/centers/dashboardtwo/secondsidenav";
import TopPilsItems from "../../../components/centers/toppills";
// import Logos from '../../../public/image/spesee.ng'


function StudGradList() {
    const router = useRouter()
    const { id } = router.query
    // const studentid = router.query.id
    // const { id } = props
    // const { students } = datas
    // console.log(props)
    const [bearer_key, setBearer_key] = useState(' ');
    const [dets, setDets] = useState({});
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setDets(JSON.parse(window.sessionStorage.getItem('dets')));
        }
    }, []);
    const [stdData, setStdData] = useState(' ')

    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        setShowNav(ClickedNav)
    }
    function deleteStud(std_id, grad_id) {
        console.log(std_id)
        console.log(grad_id)
        var urlencoded = new URLSearchParams();
        // urlencoded.append("student_id", std_id);
        // urlencoded.append("graduation_list_id", grad_id);
        urlencoded.append("Authorization", `Bearer ${bearer_key}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const deleteStudent = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/DeleteStudentfromGraduationList/${grad_id}`, requestOptions)
            const data = await response.json()
            // console.log(response.status)
            if (response.status == 200) {
                // setNotify('Faculty Deleted Successfully')
                Swal.fire({
                    title: 'Student Deleted Succesfully',
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

        }

        deleteStudent()
    }
    // console.log(id)
    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/viewStudentGraduationList/${id}`,
        headers: {
            'Authorization': `Bearer ${bearer_key}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setStdData(data.data)
                // setStdQual(data.qualifications)
                return data;

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchData()

    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/');
    }, [status]);
    if (status === "authenticated")
        return <>
            <div className="container-fluid">
                <div>
                    <div className="p-3">
                        <NewtopNAv naviState={navState} />
                    </div>
                </div>
                <div className="row ">
                    <div className={(showNav == true) ? `d-block d-lg-none col-md-3 d-flex allNavSide` : `d-none`}>
                        <AllNavs />
                    </div>
                    <div className="col-1 subNav row">
                        <AllNavs />
                    </div>
                    <div className="col-12 col-lg-11 regMain">
                        <div className="p-2">
                            <TopPilsItems />
                        </div>

                        <div className="row pt-3">
                            <div className="d-none d-lg-block col-2 border bg-info border-1">
                                <Secondnav />
                            </div>

                            <div className="col-12 col-lg-10 p-lg-3 regMain">

                                <div className="bg-info p-4 shadow rounded-0 table-responsive">

                                    <div>
                                        <h6 className="fw-bold">Total No of Students:  {stdData.length}</h6>
                                    </div>
                                    <table className="tableData table table-striped table-sm table-hover  ">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>STUDENT'S NAME</th>
                                                <th>EMAIl</th>
                                                <th>PHONE</th>
                                                <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stdData == ' ' || stdData == [] ? <p><CircularProgress /> No Student Added</p> :
                                                stdData.map(student => {
                                                    return (
                                                        <tr className='align-items-center '>
                                                            <td>{stdData.indexOf(student) + 1}</td>
                                                            <td><span><img src="" alt="" /></span> {student.name}</td>
                                                            <td>{student.email}</td>
                                                            <td>{student.phone}</td>
                                                            <td className='btn-group'>
                                                                <Link href={`/centers/studentlist/${student.student_id}`} >
                                                                    <button className='btn btn-sm btn-primary'>View</button>
                                                                </Link>
                                                                <button onClick={() => deleteStud(`${student.student_id}`, `${student.id}`)} className="btn btn-sm btn-danger">
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    return (
        <div className="justify-content-center">
            <div className="text-center ">
                <CircularProgress />
            </div>
        </div>
    )
}

export default StudGradList;

