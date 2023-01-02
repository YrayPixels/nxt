import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";


function AddSessionComp(props) {
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [sesInfo, setsesInfo] = useState({
        center_id: " ",
        session: " ",
        session_start: " ",
        session_end: " ",
    });


    const handleAddSession = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("center_id", details.id);
        urlencoded.append("session", sesInfo.session);
        urlencoded.append("session_start", sesInfo.session_start);
        urlencoded.append("session_end", sesInfo.session_end);
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addSession = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/AddSession", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Session Added Succesfully')
                Swal.fire({
                    title: 'Session Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addSession()
    };


    return (<>
        {
            notify == 'loading' && (
                <p className="text-success text-center fw-bold"><CircularProgress /></p>
            )
        }
        {
            notify != ' ' && (
                <p className="text-success text-center fw-bold">{notify}</p>)
        }
        <h3 className="py-4">
            Add Session
        </h3>
        <form className="card p-4" action="" onSubmit={handleAddSession}>
            <div className="mb-3">
                <label htmlFor="session">Session</label>
                <input onChange={(e) => setsesInfo(
                    { ...sesInfo, session: e.target.value })} type="text" name="session" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="session_start">Session Start</label>
                <input onChange={(e) => setsesInfo(
                    { ...sesInfo, session_start: e.target.value })} type="date" name="session_start" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="session_end">Session End</label>
                <input onChange={(e) => setsesInfo(
                    { ...sesInfo, session_end: e.target.value })} type="date" name="session_end" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Session</button>
            </div>
        </form>
    </>);
}

export default AddSessionComp;