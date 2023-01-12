import { Delete, Edit, Email, Phone } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AllNavs from "../../../components/allNavs";
import NewtopNAv from "../../../components/centers/dashboardtwo/newtopNav";
import Secondnav from "../../../components/centers/dashboardtwo/secondsidenav";
import TopPilsItems from "../../../components/centers/toppills";
import Logo from '../../../public/image/spesee.png'

function LecturerInfo() {
    const router = useRouter()
    const { id } = router.query
    // const { result } = datas
    // console.log(result)
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        // alert(ClickedNav)
        setShowNav(ClickedNav)
    }

    const [bearer_key, setBearer_key] = useState(' ');
    const [dets, setDets] = useState({});
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setDets(JSON.parse(window.sessionStorage.getItem('dets')));
        }
    }, []);
    const [Lecturer, setLecturer] = useState(' ')
    const [stdQual, setStdQual] = useState(' ')

    function navState(ClickedNav) {
        setShowNav(ClickedNav)
    }

    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/getLecturerById/${id}`,
        headers: {
            'Authorization': `Bearer ${bearer_key}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setLecturer(data.result)
                setStdQual(data.qualifications)
                console.log(data)
                return data;

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchData()

    // function fetchData() {
    //     console.log('this would work')
    // }


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
                        <div className="p-2">
                            <TopPilsItems />
                        </div>
                        <div className="row pt-3">
                            <div className="d-none d-lg-block col-2 border bg-info border-1">
                                <Secondnav />
                            </div>
                            <div className="col-12 col-lg-10 px-lg-3">

                                <div className="col-12">
                                    <div className="bg-info p-5 shadow">

                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <Avatar
                                                    alt={Lecturer.name}
                                                    src="/static/images/avatar/1.jpg"
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                            </div>
                                            <div>
                                                <h2 className="">
                                                    {Lecturer.name}
                                                </h2>
                                                <p><Email
                                                /> {Lecturer.email}</p>
                                                <p><Phone /> {Lecturer.phone}</p>

                                                <div className="mb-2">
                                                    <Link href={`/centers/studentlist/edit/${Lecturer.id}`}>
                                                        <button className="btn btn-sm btn-primary">
                                                            <Edit /> Edit Profile
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className="mb-2">
                                                    <Link href={`/centers/studentlist/edit/${Lecturer.id}`}>
                                                        <button className="btn btn-sm btn-danger">
                                                            <Delete /> Delete Profile
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <div className="col">
                                                <h6>Gender</h6>
                                                <p>{Lecturer.sex}</p>
                                            </div>
                                            <div className="col">
                                                <h6>Age</h6>
                                                <p>{Lecturer.age}</p>
                                            </div>
                                            <div className="col">
                                                <h6>Address</h6>
                                                <p>{Lecturer.address}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="bg-info mt-4 p-5 shadow">
                                        <div className="row">
                                            <div className="col-3">
                                                <h6>Faculty</h6>
                                                <p>{Lecturer.faculties_title}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>Department</h6>
                                                <p>{Lecturer.departments_title}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>Program</h6>
                                                <p>{Lecturer.programmes_title}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>State</h6>
                                                <p>{Lecturer.state_title}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>LGA</h6>
                                                <p>{Lecturer.lga}</p>
                                            </div>


                                            <div className="col-3">
                                                <h6>Center</h6>
                                                <p>{Lecturer.center_id}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>Employee</h6>
                                                <p>{Lecturer.employee}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>Employee Type</h6>
                                                <p>{Lecturer.employee_type}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>Employment Status</h6>
                                                <p>{Lecturer.employment_status}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>Highest Qualification</h6>
                                                <p>{Lecturer.heighest_qualification}</p>
                                            </div>
                                            <div className="col-3">
                                                <h6>Highest Qualification Year</h6>
                                                <p>{Lecturer.heighest_qualification_year}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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

export default LecturerInfo;

// export async function getServerSideProps(context) {
//     const { params } = context;
//     const { id } = params
//     // let data = id;
//     const response = await fetch(`https://stockmgt.gapaautoparts.com/api/getLecturerById/${id}`)
//     const data = await response.json()
//     return {
//         props: {
//             Lecturer: data.result[0],
//         },
//     }
// }