import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import axios from "axios";
import { CircularProgress } from "@mui/material";


function StudentRegistration() {
    const [bearer_key, setBearer_key] = useState(' ');
    const [notify, setNotify] = useState(' ');
    const [programs, setProgram] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [department, setDepartment] = useState([]);
    const [courses, setCourses] = useState([]);
    const [userInfo, setUserInfo] = useState({
        names: " ",
        email: " ",
        phone: " ",
        address: " ",
        faculty_id: " ",
        department_id: " ",
        programme_id: " ",
        occupation: " ",
        heighest_qualification: " ",
        center_id: " ",
        age: " "
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
        const allDept = "https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByCenterId/1"

        const getAllPrograms = axios.get(allPrograms);
        const getAllCourse = axios.get(allCourses);
        const getAllFaculties = axios.get(allFaculties);
        const getAllDept = axios.get(allDept);



        axios.all([getAllPrograms, getAllCourse, getAllFaculties, getAllDept]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allCoursesData = allData[1].data.result;
                const allFacultiesData = allData[2].data.result;
                const allDeptData = allData[3].data.result;


                setProgram(allProgramsData)
                setCourses(allCoursesData)
                setFaculties(allFacultiesData)
                setDepartment(allDeptData)

            })
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

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
        urlencoded.append("Authorization", `Bearer ${bearer_key}`)
        urlencoded.append("sex", "Male");
        urlencoded.append("age", "20");
        urlencoded.append("Nationality", "1");
        urlencoded.append("state", "1");
        urlencoded.append("lga", "1");
        urlencoded.append("heighest_qualification_year", "2018");
        urlencoded.append("employee", "FRS");
        urlencoded.append("employee_type", "Private");
        urlencoded.append("employment_status", "Employed");

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

            <div className="mb-3">
                <label htmlFor="fullname">Student Name</label>
                <input onChange={(e) => setUserInfo(
                    { ...userInfo, names: e.target.value })}

                    required type="text" name="fullname" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone">Telephone number</label>
                <input onChange={(e) => setUserInfo(
                    { ...userInfo, phone: e.target.value })} type="text" required name="phone" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setUserInfo(
                    { ...userInfo, email: e.target.value })} type="text" required name="email" className="form-control" />
            </div>

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
                    <label htmlFor="age">Age</label>
                    <input required onChange={(e) => setUserInfo(
                        { ...userInfo, age: e.target.value })} type="text" name="age" className="form-control" />
                </div>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="col-6 mb-3">
                    <label htmlFor="employementStatus">Employement Status</label>
                    <input required onChange={(e) => setUserInfo(
                        { ...userInfo, occupation: e.target.value })} type="text" name="employementStatus" className="form-control" />
                </div>
                <div className="col-6 mb-3">

                    <label htmlFor="occupation">Occupation</label>
                    <input required onChange={(e) => setUserInfo(
                        { ...userInfo, occupation: e.target.value })} type="text" name="occupation" className="form-control" />
                </div>
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Submit</button>
            </div>
        </form>
    </>);
}

export default StudentRegistration;