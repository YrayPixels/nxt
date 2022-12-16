import { CircularProgress } from "@mui/material";

const Studentfeedback = () => {
    return (<div className=" pt-3 ">
        <div className="card border text-center border-0 shadow p-5">
            <p className=" fw-bold fs-4">Student Feedback</p>
            <p>LAST UPDATED ON: Sep 29, 2022</p>
            <div className="display-2">
                <CircularProgress variant="determinate" value={75} />
            </div>
            <div>
                This score is calculated based on the user rating provided across an individual content type.
            </div>
        </div>
    </div>);
}

export default Studentfeedback;