import { Menu, Notifications, NotificationsActiveOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState } from "react";

function NewtopNAv(props) {
    const { naviState } = props;
    const [navOpener, setNavOpener] = useState(false)
    function openNav() {
        // alert('clicked me')
        setNavOpener(!navOpener)
        naviState(navOpener)
    }
    return (<>
        <div className="row justify-content-between align-items-center">
            <div className="d-flex col-12 col-md-6 align-items-center justify-content-between">
                <div className="d-flex">
                    <div className="SecondNavLogo">
                        <img className="img-fluid" src="./public/image/spesee.png" alt="logo" />
                    </div>
                    <div>
                        <span className="fs-4 fw-bold">(SPESSE) Dashboard</span>
                    </div>
                </div>
                <button onClick={openNav} className=" border border-1  d-md-none rounded-1 p-2">
                    <span><Menu /></span>
                </button>
            </div>
            <div className="d-flex col-12 col-md-6 align-items-center justify-content-between">
                <div className="px-3">
                    <NotificationsActiveOutlined />
                </div>
                <div className="d-flex align-items-center">
                    <Avatar />
                    <div className="row px-3">
                        <span className="col-12">Otibe Kennedy</span>
                        <span>Admin</span>
                    </div>
                </div>
                <div onClick={openNav} className=" border border-1 d-none d-md-block d-lg-none rounded-1 p-2">
                    <span><Menu /></span>
                </div>
            </div>
        </div>
    </>);
}

export default NewtopNAv;