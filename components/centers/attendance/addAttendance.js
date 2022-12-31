import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";


function AddAttendanceComp() {
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');

    const [attendanceInf, setattendanceInf] = useState({
        center_id: " ",
        session_id: " ",
        course_id: " ",
        student_id: " ",
    });
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);

    const handleEditSession = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("center_id", attendanceInf.center_id);
        urlencoded.append("session", attendanceInf.session_id);
        urlencoded.append("session_start", attendanceInf.course_id);
        urlencoded.append("session_end", attendanceInf.student_id);
        urlencoded.append("Authorization", `Bearer ${bearer_key}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const editSession = async () => {
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
        editSession()
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
            Add Attendees
        </h3>
        <form className="card p-4" action="" onSubmit={handleEditSession}>
            <div className="mb-3">
                <label htmlFor="session_id">Session</label>
                <input onChange={(e) => setattendanceInf(
                    { ...attendanceInf, session_id: e.target.value })} type="text" name="session_id" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="course_id">Course</label>
                <input onChange={(e) => setattendanceInf(
                    { ...attendanceInf, course_id: e.target.value })} type="text" name="course_id" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="student_id">Student</label>
                <input onChange={(e) => setattendanceInf(
                    { ...attendanceInf, student_id: e.target.value })} type="text" name="student_id" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Attendant</button>
            </div>
        </form>
    </>);
}

export default AddAttendanceComp;