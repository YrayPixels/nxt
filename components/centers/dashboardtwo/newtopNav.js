import { Key, Menu, Notifications, NotificationsActiveOutlined, Settings } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function NewtopNAv(props) {
    const { naviState, logo } = props;
    const [navOpener, setNavOpener] = useState(false)
    function openNav() {
        // alert('clicked me')
        setNavOpener(!navOpener)
        naviState(navOpener)
    }
    const [bearer_key, setBearer_key] = useState(' ');
    const [dets, setDets] = useState({});
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setDets(JSON.parse(window.sessionStorage.getItem('dets')));
        }
    }, []);
    return (<>
        <div className="row justify-content-between align-items-center">
            <div className="d-flex col-12 col-md-6 align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="SecondNavLogo">
                        <Image src={logo}
                            alt="Logo Img" />
                        {/* <img src={logo} alt="" /> */}
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
                <Link href={'/centers/profile'}>
                    <div className="d-flex align-items-center">
                        <Avatar />
                        <div className="row px-3">
                            <span className="col-12">{dets.center_name}</span>
                        </div>
                    </div>
                </Link>
                {/* <div className="col-2">
                    <Link href={'/centers/settings'}>
                        <span><Settings /></span>
                    </Link>
                </div> */}
                <div>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => {
                        signOut({
                            redirect: false
                        })
                    }} type="button"><Key /> Sign Out</button>
                </div>
                <div onClick={openNav} className=" border border-1 d-none d-md-block d-lg-none rounded-1 p-2">
                    <span><Menu /></span>
                </div>
            </div>
        </div>
    </>);
}

export default NewtopNAv;