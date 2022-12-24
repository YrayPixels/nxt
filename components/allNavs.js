import FirstsideNav from "./centers/dashboardtwo/firstSidenav";
import Secondnav from "./centers/dashboardtwo/secondsidenav";

function AllNavs() {
    return (<>
        <div className="col-1 border   border-1 border-start  " >
            <FirstsideNav />
        </div>
        <div className="col-2 border   border-1 border-start">
            <Secondnav />
        </div>
    </>);
}

export default AllNavs;