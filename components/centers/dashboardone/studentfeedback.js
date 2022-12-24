import { CChart } from "@coreui/react-chartjs";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

const Studentfeedback = () => {
    const [date, setDate] = useState(' ');
    // setDate(new Date());
    // let dates = getMonth()
    return (<div className="">
        <div className="p-5">
            <p className=" fw-bold fs-4">Student Feedback</p>
            <p>LAST UPDATED ON: </p>
            <div className="">
                <CChart
                    type="doughnut"
                    data={{
                        // labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                        datasets: [
                            {
                                backgroundColor: ['#41B883', '#DD1B16'],
                                data: [72, 20,],
                            },
                        ],
                    }}

                />
            </div>
            <div>
                This score is calculated based on the user rating provided across an individual content type.
            </div>
        </div>
    </div>);
}

export default Studentfeedback;