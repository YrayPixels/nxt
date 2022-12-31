import { Edit, Email, Phone } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AllNavs from "../../../components/allNavs";
import NewtopNAv from "../../../components/centers/dashboardtwo/newtopNav";
import TopPilsItems from "../../../components/centers/toppills";

function LecturerInfo(props) {
    const router = useRouter()
    const { datas, id } = props
    const { result } = datas
    console.log(props)
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        // alert(ClickedNav)
        setShowNav(ClickedNav)
    }

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
                    <div className="col-12 col-lg-8 regMain">
                        <div className="p-2">
                            <TopPilsItems />
                        </div>
                        <div className="p-lg-3 ">

                            <div className="col-12">
                                <div className="bg-info p-5 shadow">

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Avatar
                                                alt={result.name}
                                                src="/static/images/avatar/1.jpg"
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="">
                                                {result.name}
                                            </h2>
                                            <p><Email
                                            /> {result.email}</p>
                                            <p><Phone /> {result.phone}</p>

                                            <div className="mb-2 btn btn-outline-dark">
                                                <Link href={`/centers/studentlist/edit/${result.id}`}>
                                                    <Edit /> Edit Profile
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <div className="col">
                                            <h6>Gender</h6>
                                            <p>{result.sex}</p>
                                        </div>
                                        <div className="col">
                                            <h6>Age</h6>
                                            <p>{result.age}</p>
                                        </div>
                                        <div className="col">
                                            <h6>Address</h6>
                                            <p>{result.address}</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="bg-info mt-4 p-5 shadow">
                                    <div className="row">
                                        <div className="col-3">
                                            <h6>Faculty</h6>
                                            <p>{result.faculties_title}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>Department</h6>
                                            <p>{result.departments_title}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>Program</h6>
                                            <p>{result.programmes_title}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>State</h6>
                                            <p>{result.state_title}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>LGA</h6>
                                            <p>{result.lga}</p>
                                        </div>


                                        <div className="col-3">
                                            <h6>Center</h6>
                                            <p>{result.center_id}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>Employee</h6>
                                            <p>{result.employee}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>Employee Type</h6>
                                            <p>{result.employee_type}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>Employment Status</h6>
                                            <p>{result.employment_status}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>Highest Qualification</h6>
                                            <p>{result.heighest_qualification}</p>
                                        </div>
                                        <div className="col-3">
                                            <h6>Highest Qualification Year</h6>
                                            <p>{result.heighest_qualification_year}</p>
                                        </div>

                                    </div>
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

export default LecturerInfo;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params
    const response = await fetch(`https://stockmgt.gapaautoparts.com/api/getLecturerById/2`)
    const data = await response.json()
    return {
        props: {
            datas: data,
        },
    }
}