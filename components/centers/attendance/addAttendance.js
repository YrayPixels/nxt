import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Add, Remove, RemoveCircle, } from "@mui/icons-material";


function AddAttendanceComp(props) {
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [added, setAdded] = useState(' ');
    const [delay, setDelay] = useState(' ');
    const [studentList, setStudentList] = useState(' ')
    const [moduleList, setModuleList] = useState(' ')
    const [sessionList, setSessionList] = useState(' ')
    const [arrays, setArrays] = useState([])
    const [attendanceInf, setattendanceInf] = useState({
        center_id: " ",
        session_id: " ",
        course_id: " ",
        student_id: " ",
    });

    const fetchData = () => {
        const allModules = `https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/${details.id}`
        const allSession = `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`
        const allStudents = `https://stockmgt.gapaautoparts.com/api/center/GetStudentByCenterId/${details.id}`

        const getAllModules = axios.get(allModules);
        const getAllSession = axios.get(allSession);
        const getAllStudent = axios.get(allStudents);

        axios.all([getAllModules, getAllSession, getAllStudent]).then(
            axios.spread((...allData) => {
                const allModulesData = allData[0].data.result;
                const allSessionData = allData[1].data.session;
                const allStudentData = allData[2].data.students.reverse();

                setStudentList(allStudentData)
                setSessionList(allSessionData)
                setModuleList(allModulesData)
            })
        )
    }
    let attendanceArray = [];
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
    function removeStud(student) {
        let filtered = arrays.filter(function (ele) {
            return ele != student
        })
        setArrays(filtered);
    }
    function addStudent(id, name, course, faculty) {
        const student_data = {
            std_id: id,
            std_name: name,
            std_course: course,
            std_faculty: faculty,
        }

        const student = arrays.find(stud => {
            if (stud.std_id === student_data.std_id) {
                return true;
            }

            return false;
        });
        // console.log(student)
        if (student != undefined) {
            Swal.fire({
                title: 'Student Added Already',
                icon: 'error',
                confirmButtonText: 'close'
            })

        } else {
            setArrays(arrays.concat(student_data))

        }
        // console.log(student_data)
        // console.log(arrays.indexOf(student_data))


    }
    function AddAttendees() {
        // console.log(arrays)
        if (arrays.length == 0) {
            Swal.fire({
                title: 'No Student on List',
                icon: 'error',
                confirmButtonText: 'close'
            })
        } else if (attendanceInf.session_id == ' ' || attendanceInf.session_id == 'none') {
            Swal.fire({
                title: 'Kindly Select a Session',
                icon: 'error',
                confirmButtonText: 'close'
            })
        } else if (attendanceInf.course_id == ' ' || attendanceInf.course_id == 'none') {
            Swal.fire({
                title: 'Kindly Select a Course',
                icon: 'error',
                confirmButtonText: 'close'
            })
        } else {
            arrays.map(student => {
                var urlencoded = new URLSearchParams();
                urlencoded.append("center_id", details.id);
                urlencoded.append("session_id", attendanceInf.session_id);
                urlencoded.append("course_id", attendanceInf.course_id);
                urlencoded.append("student_id", student.std_id);
                urlencoded.append("Authorization", `Bearer ${bearer}`);


                var requestOptions = {
                    method: 'POST',
                    body: urlencoded,
                    redirect: 'follow'
                };

                const addst = async () => {
                    const response = fetch("https://stockmgt.gapaautoparts.com/api/AddAttendees", requestOptions)
                    const data = await response;
                    const status = data.status
                    if (status) {
                        Swal.fire({
                            title: 'Attendees added Successfully',
                            icon: 'success',
                            confirmButtonText: 'close'
                        })
                    }
                    return status
                }
                addst()
            })
        }

    }
    useEffect(() => {
        if (sessionList.length == 0 || sessionList == " ") {
            fetchData()
        }
    })

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
        <h3 className="py-4 ">
            Add Attendees
        </h3>
        <div>
            Select session and module to add attendees

            <div className="mb-3 row">
                <div className="col-6 p-1 tableData">
                    <select type="text" onChange={(e) => setattendanceInf(
                        { ...attendanceInf, course_id: e.target.value })} className="form-select" >
                        <option value="none">Select Module</option>
                        {moduleList == " " ? <span><CircularProgress /></span> :
                            moduleList.map(data => {
                                return (<option value={data.id}>
                                    {data.title}
                                </option>)
                            })
                        }
                    </select>
                </div>
                <div className="col-6 p-1 tableData">
                    <select type="text" onChange={(e) => setattendanceInf(
                        { ...attendanceInf, session_id: e.target.value })} className="form-select" >
                        <option value="none">Select Session</option>
                        {sessionList == " " ? <span><CircularProgress /></span> :
                            sessionList.map(session => {
                                return (<option value={session.id}>
                                    {session.session}
                                </option>)
                            })
                        }
                    </select>
                </div>

            </div>
        </div>
        <div className="row bg-info shadow-sm pt-3">
            <div className="table-responsive col-6 borer border-1 ">
                Student List
                <table className="tableData table table-striped table-sm table-hover ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList == ' ' ? <p><CircularProgress /></p> :
                            studentList.map(student => {

                                return (<>
                                    <tr>
                                        <td onClick={() => {
                                            addStudent(`${student.id}`, `${student.name}`, `${student.programmes_title}`, `${student.faculties_title}`,)
                                        }}>
                                            <Add className="text-primary" />
                                        </td>
                                        <td>
                                            {student.name}
                                        </td>
                                        <td>{student.programmes_title}</td>
                                        <td>{student.faculties_title}</td>
                                    </tr></>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-6">
                Attendees Selected
                <table className="tableData table table-striped table-sm table-hover ">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Department</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {arrays == [] ? <p><CircularProgress /></p> :
                            arrays.map(student => {

                                return (<>
                                    <tr>                                        <td>
                                        {student.std_name}
                                    </td>
                                        <td>{student.std_course}</td>
                                        <td>{student.std_faculty}</td>
                                        <td onClick={() => {
                                            removeStud(student)
                                        }}>
                                            <RemoveCircle className="text-danger" />
                                        </td>
                                    </tr></>)
                            })
                        }
                    </tbody>

                    <div className=" text-center pt-3 singleSubmits">
                        <button onClick={AddAttendees} className="btn w-100 text-info rounded-0">
                            Add Attedees
                        </button>
                    </div>
                </table>
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