import { Edit, Email, Phone } from "@mui/icons-material";
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
// import Logos from '../../../public/image/spesee.ng'


function StudentInfo() {
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
    const [stdQual, setStdQual] = useState(' ')

    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        setShowNav(ClickedNav)
    }

    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/center/ViewStudent/${id}`,
        headers: {
            'Authorization': `Bearer ${bearer_key}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setStdData(data.students)
                setStdQual(data.qualifications)
                console.log(data)
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

                                {stdData == null ? <p><CircularProgress /></p> :
                                    <>
                                        <div className="p-5  bg-info shadow">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <Avatar
                                                        alt={stdData.name}
                                                        src="/static/images/avatar/1.jpg"
                                                        sx={{ width: 100, height: 100 }}
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="">
                                                        {stdData.name}
                                                    </h2>
                                                    <p><Email
                                                    /> {stdData.email}</p>
                                                    <p><Phone /> {stdData.phone}</p>

                                                    <div className="mb-2 btn btn-outline-dark">
                                                        <Link href={`/centers/studentlist/edit/${stdData.id}`}>
                                                            <Edit /> Edit Profile
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <div className="col">
                                                    <h6>Gender</h6>
                                                    <p>{stdData.sex}</p>
                                                </div>
                                                <div className="col">
                                                    <h6>Age</h6>
                                                    <p>{stdData.age}</p>
                                                </div>
                                                <div className="col">
                                                    <h6>Address</h6>
                                                    <p>{stdData.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-info mt-4 p-5 shadow">
                                            <div className="row">
                                                <div className="col-3">
                                                    <h6>Faculty</h6>
                                                    <p>{stdData.faculties_title}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Department</h6>
                                                    <p>{stdData.departments_title}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Program</h6>
                                                    <p>{stdData.programmes_title}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>State</h6>
                                                    <p>{stdData.state_title}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>LGA</h6>
                                                    <p>{stdData.lga}</p>
                                                </div>


                                                <div className="col-3">
                                                    <h6>Center</h6>
                                                    <p>{stdData.center_id}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Employee</h6>
                                                    <p>{stdData.employee}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Employee Type</h6>
                                                    <p>{stdData.employee_type}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Employment Status</h6>
                                                    <p>{stdData.employment_status}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Highest Qualification</h6>
                                                    <p>{stdData.heighest_qualification}</p>
                                                </div>
                                                <div className="col-3">
                                                    <h6>Highest Qualification Year</h6>
                                                    <p>{stdData.heighest_qualification_year}</p>
                                                </div>

                                            </div>

                                            <div>
                                                <hr />
                                                <h6>Qualifications</h6>
                                                <div>
                                                    {
                                                        stdQual == null ? <p>No Qualifications yet</p>
                                                            :
                                                            <div>
                                                                llll
                                                            </div>
                                                        //         stdData.map(std => {
                                                        //             return (
                                                        //                 <div>
                                                        //                     {/* <h6>
                                                        //                         Qualification
                                                        //                         </h6> */}



                                                        //                 </div>
                                                        //             )
                                                        //         })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
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

export default StudentInfo;

// export async function getServerSideProps(context) {
//     const { params } = context;
//     const { id } = params
//     // const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/ViewStudent/${id}`)
//     // const data = await response.json()
//     // const student = data.students
//     return {
//         props: {
//             id: id,
//         },
//     }
// }

// export async function getStaticProps(context) {
//     const { params } = context;
//     const { id } = params
//     // const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/ViewStudent/${id}`)
//     // const data = await response.json()
//     // const student = data.students
//     return {
//         props: {
//             id: id,
//         },
//     }
// }