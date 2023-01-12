import { CChart } from "@coreui/react-chartjs";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const Studentfeedback = () => {
    const [date, setDate] = useState(' ');
    setInterval(() => {
        const d = new Date();
        setDate(`${d.getUTCDate()}-${d.getMonth() + 1}-${d.getFullYear()}-${d.getSeconds()}`);
    }, 1000)

    // let dates = getMonth()
    return (<div className="">
        <div className="p-5">
            <p className=" fw-bold fs-4">Student Feedback</p>
            <p>LAST UPDATED ON: {date} </p>
            <div className="">
                <CChart

                    type="doughnut"
                    data={{
                        labels: ['Satisfied', 'Dissatisfied',],
                        datasets: [
                            {
                                backgroundColor: ['#41B883', '#DD1B16'],
                                data: [72, 10],

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