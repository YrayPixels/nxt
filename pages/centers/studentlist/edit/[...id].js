import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AllNavs from "../../../../components/allNavs";
import NewtopNAv from "../../../../components/centers/dashboardtwo/newtopNav";

function EditStudents(props) {
    const router = useRouter()
    const studentid = router.query.id
    const { datas, id } = props
    const { students } = datas
    const { status, data } = useSession();
    const [showNav, setShowNav] = useState(false)
    function navState(ClickedNav) {
        setShowNav(ClickedNav)
    }

    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/');
    }, [status]);
    if (status === "authenticated")
        return <>
            <div className="container-fluid">
                <div>
                    <div className="p-3">
                        <NewtopNAv naviState={navState} />
                    </div>
                </div>
                <div className="row ">
                    <div className={(showNav == true) ? `d-block d-lg-none col-md-3 d-flex allNavSide` : `d-none`}>
                        <AllNavs />
                    </div>
                    <div className="col-4 subNav row">
                        <AllNavs />
                    </div>
                    <div className="col-12 col-lg-8  p-lg-5 regMain">

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

export default EditStudents;
export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params
    const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/ViewStudent/${id}`)
    const data = await response.json()
    const student = data.students
    return {
        props: {
            datas: data,
        },
    }
}