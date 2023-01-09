import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";


function AddAttendanceComp() {
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [added, setAdded] = useState(' ');
    const [delay, setDelay] = useState(' ');
    const [studentList, setStudentList] = useState(' ')
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
    function fetchStud() {
        var config = {
            method: 'get',
            url: `https://stockmgt.gapaautoparts.com/api/GetAllStudentsByProgrammeId/${std_id}`,
            headers: {
                'Authorization': `Bearer ${bearer}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        const fetchData = () => {
            axios(config)
                .then(function (response) {
                    const data = response.data;
                    setStudentList(data.students)
                    // setData(' ')
                    return data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchData()
    }
    function removeStudent() {

    }
    function addStudent() {

    }
    function AddAttendees() {

    }
    setInterval(function SetDelay() {
        setDelay(Math.random())
    }, 1000)
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
            {delay}
            Add Attendees
        </h3>
        <div className="row">
            <div className="table-responsive col-6 ">
                Students
                <table className="table table-striped table-hover table-sm">
                    <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Department</th>
                    </tr>

                    <tr>
                        <td>
                            Micheal Adedosun
                        </td>
                    </tr>
                </table>
            </div>
            <div className="col-6">
                Attendees Selected

            </div>
        </div>
        {/* <form className="card p-4" action="" onSubmit={handleEditSession}>
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
        </form> */}
    </>);
}

export default AddAttendanceComp;