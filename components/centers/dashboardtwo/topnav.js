import { Dashboard, Settings } from "@mui/icons-material"
import { Avatar } from "@mui/material"

function Topnav() {
    return (
        <div className=" topnav pt-2 d-flex align-items-center">
            <div className="col-6 fw-bold">
                <span><Dashboard /></span>  <span>Dashboard</span>
            </div>
            <div className="d-flex align-items-center justify-content-between col-6">
                <div className="col-5">
                    <input type="text" className="form-control w-100" placeholder="Type here" />
                </div>

                <div className="col-3 d-flex align-items-center justify-content-around">
                    <span><Avatar /></span>
                    <span> Director</span>
                </div>
                <div className="col-1">
                    <span><Settings /></span>
                </div>
            </div>
        </div>
    )
}

export default Topnav