import { Dashboard, Menu, Settings } from "@mui/icons-material"
import { Avatar } from "@mui/material"
import Link from "next/link";
import { useState } from "react"

function Topnav(props) {

    const { naviState } = props;
    const [navOpener, setNavOpener] = useState(false)
    function openNav() {
        setNavOpener(!navOpener)
        naviState(navOpener)
    }
    return (
        <div className="topnav pt-2 row align-items-center">
            <div className="col-12 d-flex col-md-6 fw-bold align-items-center justify-content-between">
                <span><Dashboard /> <span>Dashboard</span></span>
                <button onClick={openNav} className=" border border-1  d-md-none rounded-1 p-2">
                    <span><Menu /></span>
                </button>
            </div>
            <div className="d-flex align-items-center justify-content-between col-12 col-md-6">
                <div className="col-6 d-flex align-items-center justify-content-around">
                    <span><Avatar /></span>
                    <span className='profileName'> Adebayo Adesoji</span>
                </div>
                <div className="col-2">
                    <Link href={'/centers/profile/settings'}>
                        <span><Settings /></span>
                    </Link>
                </div>
                <div onClick={openNav} className=" border border-1 d-none d-md-block d-lg-none rounded-1 p-2">
                    <span><Menu /></span>
                </div>

            </div>
        </div>
    )
}

export default Topnav