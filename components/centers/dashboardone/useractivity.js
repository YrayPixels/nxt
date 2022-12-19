import { Apartment, Book, BookOnline, School } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { Progress } from "reactstrap";

function Useractivity() {
    return (<div className=" pt-3 ">
        <div className="card border border-0 shadow p-4">
            <p className="fw-bold fs-5">User Activity</p>
            <p>Total number of users: 42</p>
            <div className="">
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
            <div className="d-flex pt-3">
                <div className="p-2 text-center col-4">
                    <p className="fw-bold fs-4">4</p>
                    <div className="d-flex justify-content-center align-items-center">
                        <div>

                        </div>
                        <p>Active users</p>
                    </div>
                </div>
                <div className="p-2 text-center col-3">
                    <p className="fw-bold fs-4">32</p>
                    <div className="d-flex justify-content-center align-items-center">
                        <div>

                        </div>
                        <p>Active users</p>
                    </div>
                </div>
                <div className="p-2 text-center col-3">
                    <p className="fw-bold fs-4">5</p>
                    <div className="d-flex justify-content-center align-items-center">
                        <div>

                        </div>
                        <p>Active users</p>
                    </div>
                </div>
                <div className="p-2 text-center col-2">
                    <p className="fw-bold fs-4">20</p>
                    <div className="d-flex justify-content-center align-items-center">
                        <div>

                        </div>
                        <p>Active users</p>
                    </div>
                </div>
            </div>
            <div>
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
