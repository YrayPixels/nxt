
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Router from "next/router"
import { CircularProgress } from "@mui/material"
import FirstsideNav from "../../../components/centers/dashboardtwo/firstSidenav";
import Secondnav from "../../../components/centers/dashboardtwo/secondsidenav";
import AllFaculties from "../../../components/pagesIndex/allFaculties";
import NewtopNAv from "../../../components/centers/dashboardtwo/newtopNav";
import AllNavs from "../../../components/allNavs";
import TopPilsItems from "../../../components/centers/toppills";
import Logo from '../../../public/image/spesee.png'
import ViewInstitutes from "../../../components/centers/institution/viewInst";

function ViewInstitution() {
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
                        <div className="pb-4 px-2">
                            <TopPilsItems />
                        </div>
                        <div className="row pt-3">
                            <div className="d-none d-lg-block col-2 border bg-info border-1">
                                <Secondnav />
                            </div>
                            <div className="col-12 col-lg-10 p-lg-3">
                                <ViewInstitutes details={dets} bearer={bearer_key} />
                            </div>
                        </div>
                        <div className="container text-center mt5  pt-5">
                            <p>Copyright © 2022 Sustainable Procurement, Environmenta Social Standards Enhancement (SPESSE)</p>
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

export default ViewInstitution


