import { Edit, Email, Phone } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AllNavs from "../../../../components/allNavs";
import NewtopNAv from "../../../../components/centers/dashboardtwo/newtopNav";



function FacultyEdit(props) {
    const [bearer_key, setBearer_key] = useState(' ');
    const router = useRouter()
    const studentid = router.query.id
    const { datas, id } = props
    const { result } = datas
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        // alert(ClickedNav)
        setShowNav(ClickedNav)
    }
    const [notify, setNotify] = useState(' ');

    const [department, setDepartment] = useState([]);
    const [courseInfo, setCourseInfo] = useState({
        coursetitle: " ",
        coursecode: " ",
        unit: " ",
        department_id: " ",
    });
    const fetchData = () => {
        const allDept = "https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByCenterId/1"
        const getAllDept = axios.get(allDept);
        axios.all([getAllDept]).then(
            axios.spread((...allData) => {
                const allDeptData = allData[0].data.result;
                setDepartment(allDeptData)
            })
        )
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);
    const editCourse = async (e) => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearer_key}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("title", courseInfo.coursetitle);
        urlencoded.append("code", courseInfo.coursecode);
        urlencoded.append("department_id", courseInfo.department_id);
        urlencoded.append("unit", courseInfo.unit);
        urlencoded.append("center_id", 1);
        urlencoded.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM")

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addCourse = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddCourse", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Course Added Succesfully')
                Swal.fire({
                    title: 'Course Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured!!!',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addCourse()
    };

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
                    <div className="col-4 subNav row">
                        <AllNavs />
                    </div>
                    <div className="col-12 col-lg-8  p-lg-5 regMain">
                        {
                            notify == 'loading' && (
                                <p className="text-success text-center fw-bold"><CircularProgress /></p>
                            )
                        }
                        {
                            notify != ' ' && (
                                <p className="text-success text-center fw-bold">{notify}</p>)
                        }
                        <h3 className="py-4">
                            Add Course
                        </h3>
                        <form className="card p-4" action="" onSubmit={handleCourseReg}>
                            <div className="mb-3">
                                <label htmlFor="coursetitle">Course Title</label>
                                <input onChange={(e) => setCourseInfo(
                                    { ...courseInfo, coursetitle: e.target.value })} type="text" name="coursetitle" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="coursecode">Course Code</label>
                                <input onChange={(e) => setCourseInfo(
                                    { ...courseInfo, coursecode: e.target.value })} type="text" name="coursecode" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="unit">Unit</label>
                                <input onChange={(e) => setCourseInfo(
                                    { ...courseInfo, unit: e.target.value })} type="text" name="unit" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="department">Department</label>
                                <select name="department" onChange={(e) => setCourseInfo(
                                    { ...courseInfo, department_id: e.target.value })} class="form-select" aria-label="Default select example">

                                    <option selected>Select your Department</option>
                                    {
                                        department.map(department => {
                                            return (
                                                <option value={department.id}>{department.title}</option>

                                            )
                                        })


                                    }

                                </select>
                            </div>
                            <div className="col-5 m-auto singleSubmits">
                                <button type="submit" className="btn rounded-0  text-info w-100"> Add Course</button>
                            </div>
                        </form>
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

export default FacultyEdit;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params
    const response = await fetch(`https://stockmgt.gapaautoparts.com/api/getfacultyById/${id}`)
    const data = await response.json()
    const student = data.students
    return {
        props: {
            datas: data,
        },
    }
}