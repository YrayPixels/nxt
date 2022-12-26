import FirstsideNav from "./centers/dashboardtwo/firstSidenav";
import Secondnav from "./centers/dashboardtwo/secondsidenav";

function AllNavs() {

    return (<>
        < div className="col-3 border border-end border-1" >
            <FirstsideNav />
        </div >
        <div className="col-9">
            <Secondnav />
        </div>
    </>);
}

export default AllNavs;
