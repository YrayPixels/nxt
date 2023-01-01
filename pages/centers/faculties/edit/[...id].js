import { Edit, Email, Phone } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AllNavs from "../../../../components/allNavs";
import NewtopNAv from "../../../../components/centers/dashboardtwo/newtopNav";
import Secondnav from "../../../../components/centers/dashboardtwo/secondsidenav";
import TopPilsItems from "../../../../components/centers/toppills";



function FacultyEdit(props) {
    const [bearer_key, setBearer_key] = useState(' ');
    const router = useRouter()
    const studentid = router.query.id
    const { datas, id } = props
    const { result } = datas
    console.log(result[0].id)
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        // alert(ClickedNav)
        setShowNav(ClickedNav)
    }
    const [notify, setNotify] = useState(' ');
    const [deptInfo, setdeptInfo] = useState({
        facultyTitle: " ",
        facultyCode: " ",
    });

    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);
    const handleEditFaculty = async (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearer_key}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", `${deptInfo.facultyTitle}`);
        urlencoded.append("code", `${deptInfo.facultyCode}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addFaculty = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/EditFaculty/${result[0].id}`, requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Faculty Updated Succesfully')
                Swal.fire({
                    title: 'Faculty Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addFaculty()
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
                            <div className="col-2 border bg-info border-1">
                                <Secondnav />
                            </div>
                            <div className="col-10 p-lg-3">
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
                                    Edit Faculty
                                </h3>
                                <form className="card p-4" action="" onSubmit={handleEditFaculty}>
                                    <div className="mb-3">
                                        <label htmlFor="facultyTitle">Faculty Name</label>
                                        <input
                                            defaultValue={result[0].title} onChange={(e) => setdeptInfo(
                                                { ...deptInfo, facultyTitle: e.target.value })} type="text" name="facultyTitle" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="facultyCode">Faculty Code</label>
                                        <input defaultValue={result[0].code} onChange={(e) => setdeptInfo(
                                            { ...deptInfo, facultyCode: e.target.value })} type="text" name="facultyCode" className="form-control" />
                                    </div>
                                    <div className="col-5 m-auto singleSubmits">
                                        <button type="submit" className="btn rounded-0  text-info w-100">Save</button>
                                    </div>
                                </form>
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