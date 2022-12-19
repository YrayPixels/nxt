import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Router from "next/router"
import { CircularProgress } from "@mui/material"
import Secondnav from "../../../components/centers/dashboardtwo/secondsidenav"
import FirstsideNav from "../../../components/centers/dashboardtwo/firstSidenav"
import NewtopNAv from "../../../components/centers/dashboardtwo/newtopNav"
import Programlaunching from "../../../components/pagesIndex/launch"


function LaunchProgram
    () {
    const { status, data } = useSession();
    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/');
    }, [status]);
    if (status === "authenticated")
        return <>
            <div className="container-fluid">

                <div>
                    <div className="p-3">
                        <NewtopNAv />
                    </div>

                </div>
                <div className="row justify-content-center ">
                    <div className="col-1 border border-1 border-start  " >
                        <FirstsideNav />
                    </div>
                    <div className="col-2 border border-1 border-start">
                        <Secondnav />
                    </div>
                    <div className="col-9 p-5 regMain">
                        <Programlaunching />
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

export default LaunchProgram