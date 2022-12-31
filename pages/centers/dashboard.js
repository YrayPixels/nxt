import TotalactiveUsers from "../../components/centers/dashboardone/activeusers"
import Recentregisterd from "../../components/centers/dashboardone/recentlyregistered"
import Studentfeedback from "../../components/centers/dashboardone/studentfeedback"
import TotalCourse from "../../components/centers/dashboardone/totalcourses"
import Totalfaculty from "../../components/centers/dashboardone/totalfaculty"
import Totalfemale from "../../components/centers/dashboardone/totalfemale"
import Useractivity from "../../components/centers/dashboardone/useractivity"
import Topnav from "../../components/centers/dashboardtwo/topnav"
import Sidenav from "../../components/centers/sidenav"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Router from "next/router"
import { CircularProgress } from "@mui/material"
import NewtopNAv from "../../components/centers/dashboardtwo/newtopNav"

function Dashboard() {
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    console.log(data)
    function navState(ClickedNav) {
        // alert(ClickedNav)
        setShowNav(ClickedNav)
    }
    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/');
    }, [status]);
    if (status === "authenticated")
        return (
            <div className="container-fluid">
                <div className="py-4 px-2">
                    {/* <Topnav naviState={navState} /> */}
                    <NewtopNAv naviState={navState} />
                </div>
                <div className=" row dashboardCenters">
                    <div className={(showNav == true) ? `d-block d-lg-none col-md-3 sidenav` : `d-none`}>
                        <Sidenav></Sidenav>
                    </div>
                    <div className="d-none col-md-3 d-lg-block">
                        <Sidenav></Sidenav>
                    </div>

                    <div className={`col-12 col-lg-9 dashmain p-4`}>


                        <div className="row g-2 pillTop justify-content-between align-items-center mt-3">
                            {/* Top Pills */}
                            <div className="col-5 col-lg-3">
                                <Totalfaculty />
                            </div>
                            <div className="col-5 col-lg-3">
                                <TotalactiveUsers />
                            </div>
                            <div className="col-5 col-lg-3">
                                <TotalCourse />
                            </div>
                            <div className="col-5 col-lg-3">
                                <Totalfemale />
                            </div>
                        </div>
                        {/* User Activity and feedback  */}
                        <div className="row  g-3 align-items-stretch  pt-4 overflow-hidden">
                            <div className="col-12 me-5 col-md-6 card border border-0 shadow ">
                                <Useractivity />
                            </div>
                            <div className="col-12 col-md-5 card border text-center border-0 shadow">
                                <Studentfeedback />
                            </div>
                        </div>

                        {/* Recently Registerd */}
                        <div className="pt-4">
                            <Recentregisterd />
                        </div>
                    </div>
                </div>
            </div >
        )

    return (
        <div className="justify-content-center">
            <div className="text-center ">
                <CircularProgress />
            </div>
        </div>
    )
}

export default Dashboard