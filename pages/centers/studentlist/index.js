
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Router from "next/router"
import { CircularProgress } from "@mui/material"
import FirstsideNav from "../../../components/centers/dashboardtwo/firstSidenav";
import Secondnav from "../../../components/centers/dashboardtwo/secondsidenav";
import StudentsList from "../../../components/centers/dashboardtwo/registeredstudents";




function Students() {
    const { status, data } = useSession();
    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/');
    }, [status]);
    if (status === "authenticated")
        return <>
            <div className="container-fluid">
                <div>
                    <div className="p-3">
                        for top nav
                    </div>
                </div>
                <div className="row justify-content-center ">
                    <div className="col-1 sticky-top border border-1 border-start  " >
                        <FirstsideNav />
                    </div>
                    <div className="col-2 border  border-1 border-start">
                        <Secondnav />
                    </div>
                    <div className="col-9 p-5 regMain">
                        <StudentsList />
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

export default Students


