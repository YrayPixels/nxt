import { Notifications, NotificationsActiveOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";

function NewtopNAv() {
    return (<>
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
                <div>
                    <img src="/" alt="" />
                </div>
                <div>
                    <p className="fs-4 fw-bold">(SPESSE) Dashboard</p>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-around">
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