import { EmailOutlined, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router"
import { useState } from "react";
import useSWR from 'swr';
import FirstsideNav from "../../../components/centers/dashboardtwo/firstSidenav";
import Secondnav from "../../../components/centers/dashboardtwo/secondsidenav";

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM");

var requestOptions = {
    method: 'GET',
    // headers: myHeaders,
    redirect: 'follow'
};


function Lecturer() {

    const fetcher = async () => {
        const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/getLecturerByCenterId/1", requestOptions)
        const data = await response.json()
        return data.result
    }
    const { data, error } = useSWR('register', fetcher)

    const router = useRouter()
    const lecturer_id = router.query.id
    console.log(data[lecturer_id])

    return (<>
        <div className="container-fluid">
            <div>
                <div className="p-3">
                    for top nav
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


                </div>
            </div>
        </div>
    </>)
}
export default Lecturer