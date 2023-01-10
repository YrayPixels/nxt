import FirstsideNav from "./centers/dashboardtwo/firstSidenav";
import Secondnav from "./centers/dashboardtwo/secondsidenav";

function AllNavs() {

    return (<>
        < div className="border border-end border-1" >
            <FirstsideNav />
        </div >
        <div className="col-9 d-lg-none   border  border-1">
            <Secondnav />
        </div>
    </>);
}

export default AllNavs;
