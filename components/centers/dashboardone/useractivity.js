import { AccountBoxRounded, AddBox, Apartment, Book, BookOnline, GifBox, School } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { Progress } from "reactstrap";

function Useractivity() {
    return (<div className="  ">
        <div className="p-4">
            <p className="fw-bold fs-5">User Activity</p>
            <p>Total number of users: 42</p>
            <div className="py-4">
                <Progress
                    style={{
                        height: '35px',
                        borderRadius: "0px"

                    }}
                    multi>
                    <Progress
                        bar
                        value="35"
                    />
                    <Progress
                        bar
                        color="success"
                        value="25"
                    />

                    <Progress
                        bar
                        color="newcol1"
                        value="25"
                    />
                    <Progress
                        bar
                        color="danger"
                        value="15"
                    />
                </Progress>

            </div>
            <div className="d-flex py-5">
                <div className="p-2  col-4">
                    <span className="fw-bold fs-4">4</span>
                    <div className="d-flex activityIcons justify-content-start align-items-center">
                        <div>
                            <AddBox />
                        </div>
                        <span>Active users</span>
                    </div>
                </div>
                <div className="p-2  col-3">
                    <span className="fw-bold fs-4">1</span>
                    <div className="d-flex activityIcons justify-content-start align-items-center">
                        <div>
                            <AddBox />
                        </div>
                        <span>Observant Users</span>
                    </div>
                </div>
                <div className="p-2  col-3">
                    <span className="fw-bold fs-4">2</span>
                    <div className="d-flex activityIcons justify-content-start align-items-center">
                        <div>
                            <AddBox />
                        </div>
                        <span>Dormant Users</span>
                    </div>
                </div>
                <div className="p-2  col-2">
                    <span className="fw-bold fs-4">2</span>
                    <div className="d-flex activityIcons justify-content-start align-items-center">
                        <div>
                            <AddBox />
                        </div>
                        <span>Inactive USers</span>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <div className="d-flex align-items-center">
                    <span className="col-3 d-flex justify-content-between">Students <span><School /></span></span>
                    <span className="col-7 px-2"><Progress
                        color="danger"
                        style={{
                            height: '10px',
                        }}
                        value={76}
                    /></span>
                    <span className="col-2">400</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="col-3 d-flex justify-content-between">Courses <span><Book /></span> </span>
                    <span className="col-7 px-2"><Progress
                        color="primary"
                        animated

                        style={{
                            height: '10px',
                        }}
                        value={54}
                    /></span>
                    <span className="col-2">240</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="col-3 d-flex justify-content-between">Faculty <span><Apartment /></span> </span>
                    <span className="col-7 px-2"><Progress
                        color="newcol3"
                        style={{
                            height: '10px',
                        }}
                        value={85}
                    /></span>
                    <span className="col-2">160</span>
                </div>
            </div>
        </div>
    </div >);
}

export default Useractivity;
