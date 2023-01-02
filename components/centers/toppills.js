import TotalactiveUsers from "./dashboardone/activeusers";
import TotalCourse from "./dashboardone/totalcourses";
import Totalfaculty from "./dashboardone/totalfaculty";
import Totalfemale from "./dashboardone/totalfemale";


function TopPilsItems() {
    return (<>
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
    </>);
}

export default TopPilsItems;