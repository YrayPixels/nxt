import TotalactiveUsers from "../../components/centers/dashboardone/activeusers"
import Recentregisterd from "../../components/centers/dashboardone/recentlyregistered"
import Studentfeedback from "../../components/centers/dashboardone/studentfeedback"
import TotalCourse from "../../components/centers/dashboardone/totalcourses"
import Totalfaculty from "../../components/centers/dashboardone/totalfaculty"
import Totalfemale from "../../components/centers/dashboardone/totalfemale"
import Useractivity from "../../components/centers/dashboardone/useractivity"
import Topnav from "../../components/centers/dashboardtwo/topnav"
import Sidenav from "../../components/centers/sidenav"

function Dashboard() {
    return (
        <div className="container-fluid">
            <div className=" row dashboardCenters">
                <div className="col-3 sidenav">
                    <Sidenav></Sidenav>
                </div>

                <div className="col-9 dashmain p-4">
                    <Topnav />
                    <div className="row justify-content-between align-items-center mt-3">
                        {/* Top Pills */}
                        <div className="col-3">
                            <Totalfaculty />
                        </div>
                        <div className="col-3">
                            <TotalactiveUsers />
                        </div>
                        <div className="col-3">
                            <TotalCourse />
                        </div>
                        <div className="col-3">
                            <Totalfemale />
                        </div>
                    </div>
                    {/* User Activity and feedback  */}
                    <div className="row align-items-stretch">
                        <div className="col-7">
                            <Useractivity />
                        </div>
                        <div className="col-5">
                            <Studentfeedback />
                        </div>
                    </div>

                    {/* Recently Registerd */}
                    <div className="pt-4">
                        <Recentregisterd />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard