import { Email, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import FirstsideNav from "../../../components/centers/dashboardtwo/firstSidenav";
import Secondnav from "../../../components/centers/dashboardtwo/secondsidenav";

function LecturerDetails({ datas }) {
    const { name, email, phone, heighest_qualification
        , occupation, address } = datas
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
                    <div className="d-flex p-5 justify-content-between align-items-center bg-info shadow">
                        <div>
                            <Avatar
                                alt={name}
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 100, height: 100 }}
                            />
                        </div>
                        <div>
                            <h2 className="">
                                {name}
                            </h2>
                            <p><Email
                            /> {email}</p>
                            <p><Phone /> {phone}</p>
                        </div>
                    </div>

                    <div className="bg-info mt-4 p-5 shadow">
                        <div>
                            <h2>{email}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default LecturerDetails;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params
    const response = await fetch('https://stockmgt.gapaautoparts.com/api/center/getLecturerByCenterId/1')

    const data = await response.json()
    const datas = data.result[id]

    return {
        props: {
            datas: datas,
        },
    }
}