import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Add, PlusOneOutlined } from "@mui/icons-material";


function StudentRegistration() {
    const [bearer_key, setBearer_key] = useState(' ');
    const [notify, setNotify] = useState(' ');
    const [programs, setProgram] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [department, setDepartment] = useState([]);
    const [lga, setLga] = useState([]);
    const [state, setStateDa] = useState([]);
    const [faculty_id, setFaculty_id] = useState([]);
    const [showMore, setShowMore] = useState(false)

    // console.log(faculty_id)

    // const [nationality, setNationality] = useState([])

    const [courses, setCourses] = useState([]);
    const [userInfo, setUserInfo] = useState({
        names: " ",
        email: " ",
        phone: " ",
        address: " ",
        faculty_id: " ",
        department_id: " ",
        programme_id: " ",
        heighest_qualification: " ",
        center_id: " ",
        age: " ",
        sex: "",
        Nationality: " ",
        state: " ",
        lga: " ",
        heighest_qualification_year: " ",
        employee: " ",
        employee_type: "",
        employment_status: " ",
    });

    const { session, status } = useSession();
    // console.log(useSession())

    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);
    // console.log(session.user)
    const fetchData = () => {
        const allFaculties = "https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/1"
        const allPrograms = "https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes"
        const allCourses = "https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/1"
        const allDept = `https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByFacultyId/1`
        const allStates = "https://stockmgt.gapaautoparts.com/api/getAllStates"
        const allLga = `https://stockmgt.gapaautoparts.com/api/getLGA/0`

        const getAllPrograms = axios.get(allPrograms);
        const getAllCourse = axios.get(allCourses);
        const getAllFaculties = axios.get(allFaculties);
        const getAllDept = axios.get(allDept);
        const getAllStates = axios.get(allStates);
        const getAllLga = axios.get(allLga);



        axios.all([getAllPrograms, getAllCourse, getAllFaculties, getAllDept, getAllStates, getAllLga]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allCoursesData = allData[1].data.result;
                const allFacultiesData = allData[2].data.result;
                const allDeptData = allData[3].data.result;
                const allStateData = allData[4].data.result;
                const allLgaData = allData[5].data.result;



                setProgram(allProgramsData)
                setCourses(allCoursesData)
                setFaculties(allFacultiesData)
                setDepartment(allDeptData)
                setStateDa(allStateData)
                setLga(allLgaData)
            })
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    function showExtraFields(e) {
        e.preventDefault()
        setShowMore(!showMore)
        alert(showMore)
    }
    const handleStudentReg = async (e) => {
        e.preventDefault()


        var urlencoded = new URLSearchParams();
        urlencoded.append("name", userInfo.names);
        urlencoded.append("email", userInfo.email);
        urlencoded.append("phone", userInfo.phone);
        urlencoded.append("address", userInfo.address);
        urlencoded.append("faculty_id", userInfo.faculty_id);
        urlencoded.append("department_id", userInfo.department_id);
        urlencoded.append("programme_id", userInfo.programme_id);
        urlencoded.append("occupation", userInfo.occupation);
        urlencoded.append("heighest_qualification", userInfo.heighest_qualification);
        urlencoded.append("center_id", 1);
        urlencoded.append("Authorization", `Bearer ${bearer_key} `)
        urlencoded.append("sex", userInfo.sex);
        urlencoded.append("age", userInfo.age);
        urlencoded.append("Nationality", userInfo.Nationality);
        urlencoded.append("state", userInfo.state);
        urlencoded.append("lga", userInfo.lga);
        urlencoded.append("heighest_qualification_year", userInfo.heighest_qualification_year);
        urlencoded.append("employee", userInfo.employee);
        urlencoded.append("employee_type", userinfo.employee_type);
        urlencoded.append("employment_status", userinfo.employment_status);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')
        // console.log(urlencoded)
        const addStudent = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddNewStudent", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Student Added Succesfully')
                Swal.fire({
                    title: 'Student Added Succesfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else if (status == 202) {
                setNotify('Student Already Registered')
                Swal.fire({
                    title: 'Students Already Registered',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            } else {
                setNotify('Error Occured!!!')
            }

        }
        addStudent()

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
        <h3 className="py-4 d-flex align-items-center">
            Student Registration Information
        </h3>
        <form className="card p-4" action="" onSubmit={handleStudentReg} >
            <fieldset className="row">
                <legend>Personal Data</legend>
                <div className="col-6 mb-3">
                    <label htmlFor="fullname">Student Name</label>
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, names: e.target.value })}

                        required type="text" name="fullname" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="phone">Telephone number</label>
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, phone: e.target.value })} type="text" required name="phone" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, email: e.target.value })} type="text" required name="email" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="age">Age</label>
                    <input required onChange={(e) => setUserInfo(
                        { ...userInfo, age: e.target.value })} type="text" name="age" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="state">State of Origin</label>
                    <select required name="state" onChange={(e) => setUserInfo(
                        { ...userInfo, state: e.target.value })} class="form-select" aria-label="Default select example"  >

                        <option selected>Select your State</option>
                        {
                            state.map(State => {
                                return (
                                    <option value={State.id}>{State.title}</option>

                                )
                            })

                        }

                    </select>
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="lga">LGA</label>
                    <select required name="lga" onChange={(e) => setUserInfo(
                        { ...userInfo, lga: e.target.value })} class="form-select" aria-label="Default select example"  >

                        <option selected>Select your LGA</option>
                        {
                            lga.map(lga => {
                                return (
                                    <option value={lga.id}>{lga.title}</option>

                                )
                            })

                        }

                    </select>
                </div>

            </fieldset>
            {/* Educaional Background */}
            <fieldset>
                <legend>
                    Educational Information
                </legend>
                <div className="mb-3 row ">
                    <div className="col-6 mb-3">
                        <label htmlFor="falculty">Faculty</label>
                        <select required name="department" onChange={(e) => setUserInfo(
                            { ...userInfo, faculty_id: e.target.value })} class="form-select" aria-label="Default select example"  >

                            <option selected>Select your Faculty</option>
                            {
                                faculties.map(faculty => {
                                    return (
                                        <option value={faculty.id}>{faculty.title}</option>

                                    )
                                })

                            }

                        </select>
                    </div>

                    <div className="col-6 mb-3">
                        <label htmlFor="department">Department</label>
                        <select required name="department" onChange={(e) => setUserInfo(
                            { ...userInfo, department_id: e.target.value })} class="form-select" aria-label="Default select example">

                            <option selected>Select your Department</option>
                            {
                                department.map(department => {
                                    return (
                                        <option value={department.id}>{department.title}</option>

                                    )
                                })


                            }

                        </select>
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="programme">Programme</label>
                        <select required name="programme" onChange={(e) => setUserInfo(
                            { ...userInfo, programme_id: e.target.value })} class="form-select" aria-label="Default select example">

                            <option selected>Select your program</option>
                            {
                                programs.map(program => {
                                    return (
                                        <option value={program.id}>{program.title}</option>

                                    )
                                })

                            }

                        </select>
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="address">Address</label>
                        <input required onChange={(e) => setUserInfo(
                            { ...userInfo, address: e.target.value })} type="text" name="address" className="form-control" />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="academic">Highest Qualification</label>
                        <input required onChange={(e) => setUserInfo(
                            { ...userInfo, heighest_qualification: e.target.value })} type="text" name="academic" className="form-control" />
                    </div>
                    <button onClick={showExtraFields} className="btn col-6 btn-outline-dark"> <Add /> Add Qualifications</button>
                    <form action="">
                        <div className="col-6 mb-3">
                            <label htmlFor="academic">Qualification</label>
                            <input required onChange={(e) => setUserInfo(
                                { ...userInfo, heighest_qualification: e.target.value })} type="text" name="academic" className="form-control" />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="academic">Year</label>
                            <input required onChange={(e) => setUserInfo(
                                { ...userInfo, heighest_qualification: e.target.value })} type="text" name="academic" className="form-control" />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="academic">Institution</label>
                            <input required onChange={(e) => setUserInfo(
                                { ...userInfo, heighest_qualification: e.target.value })} type="text" name="academic" className="form-control" />
                        </div>
                    </form>

                </div>
            </fieldset>
            {/* Employment Info */}
            <fieldset>
                <legend>
                    Employemnt Information
                </legend>
                <div className="mb-3 row ">
                    <div className="col-6 mb-3">
                        <label htmlFor="Employee">Employee</label>
                        <input required name="employee" onChange={(e) => setUserInfo(
                            { ...userInfo, employee: e.target.value })} class="form-select" aria-label="Default select example" />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="EmployeeType">Employee Type</label>
                        <input required name="employeeType" onChange={(e) => setUserInfo(
                            { ...userInfo, employee_type: e.target.value })} class="form-select" aria-label="Default select example" />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="employmentStatus">Employment Status</label>
                        <input required name="employmentStatus" onChange={(e) => setUserInfo(
                            { ...userInfo, employment_status: e.target.value })} class="form-select" aria-label="Default select example" />
                    </div>
                </div>
                <div className="col-5 m-auto singleSubmits">
                    <button type="submit" className="btn rounded-0  text-info w-100"> Submit</button>
                </div>
            </fieldset>
        </form>
    </>);
}

export default StudentRegistration;