import { useEffect, useState } from "react";
import TotalactiveUsers from "./dashboardone/activeusers";
import TotalCourse from "./dashboardone/totalcourses";
import Totalfaculty from "./dashboardone/totalfaculty";
import Totalfemale from "./dashboardone/totalfemale";


function TopPilsItems() {
    const [bearer_key, setBearer_key] = useState(' ');
    const [dets, setDets] = useState({});
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setDets(JSON.parse(window.sessionStorage.getItem('dets')));
        }
    }, []);


    return (<>
        <div className="row g-2 pillTop justify-content-between align-items-center mt-3">
            {/* Top Pills */}
            <div className="col-5 col-lg-3">
                <Totalfaculty det={dets} bearer_key={bearer_key} />
            </div>
            <div className="col-5 col-lg-3">
                <TotalactiveUsers det={dets} bearer_key={bearer_key} />
            </div>
            <div className="col-5 col-lg-3">
                {/* <TotalCourse det={dets} bearer_key={bearer_key} /> */}
            </div>
            <div className="col-5 col-lg-3">
                {/* <Totalfemale det={dets} bearer_key={bearer_key} /> */}
            </div>
        </div>
    </>);
}

export default TopPilsItems;