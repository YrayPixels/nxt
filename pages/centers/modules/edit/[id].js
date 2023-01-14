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
import Secondnav from "../../../../components/centers/dashboardtwo/secondsidenav";
import TopPilsItems from "../../../../components/centers/toppills";



function CourseEdit() {
    const [bearer_key, setBearer_key] = useState(' ');
    const [dets, setDets] = useState({});
    const [delay, setDelay] = useState(' ')
    const router = useRouter()
    const { id } = router.query
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        // alert(ClickedNav)
        setShowNav(ClickedNav)
    }
    const [notify, setNotify] = useState(' ');
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setDets(JSON.parse(window.sessionStorage.getItem('dets')));
        }
    }, []);

    const [department, setDepartment] = useState([]);
    const [courseInfo, setCourseInfo] = useState({
        coursetitle: " ",
        coursecode: " ",
        unit: " ",
        department_id: " ",
    });
    const fetchData = () => {
        const allDept = `https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByCenterId/${dets.id}`
        const allModules = `https://stockmgt.gapaautoparts.com/api/center/getCourseById/${id}`

        const getAllDept = axios.get(allDept);
        const getAllMod = axios.get(allModules);
        axios.all([getAllDept, getAllMod]).then(
            axios.spread((...allData) => {
                const allDeptData = allData[0].data.result;
                const allModData = allData[1].data.result;
                // console.log(allModData)
                setDepartment(allDeptData)
                setCourseInfo({
                    coursetitle: allModData.title,
                    coursecode: allModData.code,
                    unit: allModData.unit,
                    department_id: allModData.department_id,

                })
            })
        )
    }

    useEffect(() => {
        if (department.length == 0 || department == ' ') {
            fetchData()
        }
    })

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
        urlencoded.append("center_id", dets.id);
        urlencoded.append("Authorization", `Bearer ${bearer_key}`)

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addCourse = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/EditCourse/${id}`, requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Course Edited Succesfully')
                Swal.fire({
                    title: 'Course Edited Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                Router.push('/centers/modules')
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
                    <div className="col-1 subNav row">
                        <AllNavs />
                    </div>
                    <div className="col-12 col-lg-11 regMain">
                        <div className="pb-4 px-2">
                            <TopPilsItems />
                        </div>
                        <div className="row pt-3">
                            <div className="d-none d-lg-block col-2 border bg-info border-1">
                                <Secondnav />
                            </div>

                            <div className="col-12 col-lg-10 p-lg-3">

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
                                    Edit Course
                                </h3>
                                <form className="card p-4" action="" onSubmit={editCourse}>
                                    <div className="mb-3">
                                        <label htmlFor="node">Node</label>
                                        <select name="node" onChange={(e) => setCourseInfo(
                                            { ...courseInfo, node_id: e.target.value })} class="form-select" aria-label="Default select example">

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
                                    <div className="mb-3">
                                        <label htmlFor="coursetitle">Module Title</label>
                                        <input value={courseInfo.coursetitle} onChange={(e) => setCourseInfo(
                                            { ...courseInfo, coursetitle: e.target.value })} type="text" name="coursetitle" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="coursecode">Module Code</label>
                                        <input value={courseInfo.coursecode} onChange={(e) => setCourseInfo(
                                            { ...courseInfo, coursecode: e.target.value })} type="text" name="coursecode" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="unit">Unit</label>
                                        <input value={courseInfo.unit} onChange={(e) => setCourseInfo(
                                            { ...courseInfo, unit: e.target.value })} type="text" name="unit" className="form-control" />
                                    </div>
                                    <div className="col-5 m-auto singleSubmits">
                                        <button type="submit" className="btn rounded-0  text-info w-100"> Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container text-center mt5  pt-5">
                            <p>Copyright © 2022 Sustainable Procurement, Environmenta Social Standards Enhancement (SPESSE)</p>
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

export default CourseEdit;

// export async function getServerSideProps(context) {
//     const { params } = context;
//     const { id } = params
//     const response = await fetch(`https://stockmgt.gapaautoparts.com/api/getfacultyById/${id}`)
//     const data = await response.json()
//     const student = data.students
//     return {
//         props: {
//             datas: data,
//         },
//     }
// }