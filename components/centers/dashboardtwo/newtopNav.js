import { Notifications, NotificationsActiveOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function NewtopNAv() {
    return (<>
        <div className="row justify-content-between align-items-center">
            <div className="d-flex col-6 align-items-center justify-content-start">
                <div className="SecondNavLogo">
                    <img className="img-fluid" src="../image/spesee.png" alt="logo" />
                </div>
                <div>
                    <span className="fs-4 fw-bold">(SPESSE) Dashboard</span>
                </div>
            </div>
            <div className="d-flex col-6 align-items-center justify-content-around">
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
            </div>
        </div>
    </>);
}

export default NewtopNAv;