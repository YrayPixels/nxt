import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Add, Remove, RemoveCircle, } from "@mui/icons-material";


function AddGraduatingList(props) {
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [added, setAdded] = useState(' ');
    const [delay, setDelay] = useState(' ');
    const [studentList, setStudentList] = useState(' ')
    const [gradList, setGradList] = useState(' ')
    const [arrays, setArrays] = useState([])
    const [gradInf, setGradInf] = useState({
        center_id: " ",
        list_id: " ",

    });

    const fetchData = () => {
        const allGrad = `https://stockmgt.gapaautoparts.com/api/GetCreateGraduatingListByCenter/${details.id}`
        const allStudents = `https://stockmgt.gapaautoparts.com/api/center/GetStudentByCenterId/${details.id}`

        const getallGrad = axios.get(allGrad);
        const getAllStudent = axios.get(allStudents);

        axios.all([getallGrad, getAllStudent]).then(
            axios.spread((...allData) => {
                const allGradData = allData[0].data.data;
                const allStudentData = allData[1].data.students.reverse();

                setStudentList(allStudentData)
                setGradList(allGradData)
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
    function AddGraduates() {
        if (arrays.length == 0) {
            Swal.fire({
                title: 'No Student on List',
                icon: 'error',
                confirmButtonText: 'close'
            })
        } else if (gradInf.list_id == ' ' || gradInf.list_id == 'none') {
            Swal.fire({
                title: 'Kindly Select a List',
                icon: 'error',
                confirmButtonText: 'close'
            })
        } else {
            console.log(gradInf.list_id)

            arrays.map(student => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${bearer}`);
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                var urlencoded = new URLSearchParams();
                urlencoded.append("student_id", student.std_id);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                };

                const addst = async () => {
                    const response = fetch(`https://stockmgt.gapaautoparts.com/api/AddStudentToGraduationList/${gradInf.list_id}`, requestOptions)
                    const data = await response;
                    const status = data.status
                    if (status == 200) {
                        Swal.fire({
                            title: 'Students added Successfully',
                            icon: 'success',
                            confirmButtonText: 'close'
                        })
                    } else if (status == 201) {
                        Swal.fire({
                            title: 'Students Already Added',
                            icon: 'error',
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
        if (studentList.length == 0 || studentList == ' ') {
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
            Add Students to Graduating List
        </h3>
        <div>
            Select Graduating List to add Students

            <div className="mb-3 row">
                <div className="col-6 p-1 tableData">
                    <select onClick={fetchData} type="text" onChange={(e) => setGradInf(
                        { ...gradInf, list_id: e.target.value })} placeholder="select course" className="form-select" >
                        <option value={'none'}>Select Graduation List</option>
                        {gradList == " " ? <span><CircularProgress /></span> :
                            gradList.map(data => {
                                return (<option key={data.id} value={data.id}>
                                    {data.title}
                                </option>)
                            })
                        }
                    </select>
                </div>


            </div>
        </div>
        <div onClick={fetchData} className="row bg-info shadow-sm pt-3">
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
                                    <tr key={student.id}>
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
                Student Selected
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
                        {arrays == [] ? <tr> <p><CircularProgress /></p></tr> :
                            arrays.map(student => {

                                return (<>
                                    <tr key={student.id}>                                        <td>
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
                        <button onClick={AddGraduates} className="btn w-100 text-info rounded-0">
                            Add Students
                        </button>
                    </div>
                </table>
            </div>
        </div>

    </>);
}

export default AddGraduatingList;