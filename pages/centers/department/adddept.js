import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Router from "next/router"
import { CircularProgress } from "@mui/material"
import AddDepartment from "../../../components/centers/createcomponent/addDepartment"
import NewtopNAv from "../../../components/centers/dashboardtwo/newtopNav"
import AllNavs from "../../../components/allNavs"


function RegisterDepartment() {
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
                    <AllNavs />
                    <div className="col-9 p-5 regMain">
                        <AddDepartment />
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

export default RegisterDepartment