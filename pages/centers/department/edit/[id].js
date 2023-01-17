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
import Logo from '../../../../public/image/spesee.png'



function DepartmentEdit() {
    const router = useRouter()
    const { id } = router.query
    const [bearer_key, setBearer_key] = useState(' ');
    const [dets, setDets] = useState({});
    // const studentid = router.query.id
    const [deptData, setDeptData] = useState(' ');
    const [faculty, setFaculty] = useState([]);
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        // alert(ClickedNav)
        setShowNav(ClickedNav)
    }

    const [notify, setNotify] = useState(' ');
    const [deptInfo, setdeptInfo] = useState({
        depttitle: " ",
        deptcode: " ",
        faculty_id: " ",
    });
    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/getDepartmentById/${id}`,
        headers: {
            'Authorization': `Bearer ${bearer_key}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchDept = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setdeptInfo({
                    faculty_id: data.result[0].faculty_id,
                    depttitle: data.result[0].title,
                    deptcode: data.result[0].code
                })
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setDets(JSON.parse(window.sessionStorage.getItem('dets')));
        }
    }, []);


    const fetchData = () => {
        const allFaculty = `https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/${dets.id}`
        const getallFaculty = axios.get(allFaculty);
        axios.all([getallFaculty]).then(
            axios.spread((...allData) => {
                const allFacultyData = allData[0].data.result;
                setFaculty(allFacultyData)
            })
        )
    }
    useEffect(() => {
        if (deptInfo.depttitle == ' ' || deptInfo.deptcode == ' ') {
            fetchData()
            fetchDept()
        }
    })

    const handleDeptReg = async (e) => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearer_key}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", deptInfo.depttitle);
        urlencoded.append("code", deptInfo.deptcode);
        urlencoded.append("faculty_id", deptInfo.faculty_id);
        urlencoded.append("center_id", dets.id);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addDepartment = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/EditDepartment/${id}`, requestOptions)
            const data = await response.json()
            const status = response.status;

            if (status == 200) {
                setNotify('Department Updated Succesfully')
                Swal.fire({
                    title: 'Department Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                Router.push('/centers/department')
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured!!!',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addDepartment()
    };

    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/');
    }, [status]);
    if (status === "authenticated")
        return <>
            <div className="container-fluid">
                <div>
                    <div className="p-3">
                        <NewtopNAv logo={Logo} naviState={navState} />
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
                                    Edit Department
                                </h3>
                                <form className="card p-4" action="" onSubmit={handleDeptReg}>
                                    <div className="mb-3">
                                        <label htmlFor="depttitle">Department Name</label>
                                        <input value={deptInfo.depttitle} onChange={(e) => setdeptInfo(
                                            { ...deptInfo, depttitle: e.target.value })} type="text" name="depttitle" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="deptcode">Department Code</label>
                                        <input value={deptInfo.deptcode} onChange={(e) => setdeptInfo(
                                            { ...deptInfo, deptcode: e.target.value })} type="text" name="deptcode" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="falculty">Faculty</label>
                                        <select value={deptInfo.faculty_id} name="department" onChange={(e) => setdeptInfo(
                                            { ...deptInfo, faculty_id: e.target.value })} class="form-select" aria-label="Default select example"  >
                                            <option selected>Select your Faculty</option>
                                            {
                                                faculty.map(faculty => {
                                                    return (
                                                        <option key={faculty.id} value={faculty.id}>{faculty.title}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-5 m-auto singleSubmits">
                                        <button type="submit" className="btn rounded-0  text-info w-100"> Save</button>
                                    </div>
                                </form>
                            </div>
                            <div className="container text-center mt5  pt-5">
                                <p>Copyright © 2022 Sustainable Procurement, Environmenta Social Standards Enhancement (SPESSE)</p>
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

export default DepartmentEdit;

