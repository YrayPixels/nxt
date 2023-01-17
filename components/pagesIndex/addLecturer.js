import { useState, useEffect } from "react";
import { Router, useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import { Add, RemoveCircle } from "@mui/icons-material";


function LecturerRegistration(props) {
    const router = useRouter()

    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');

    const [programs, setProgram] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [department, setDepartment] = useState([]);
    const [qual, setqual] = useState([]);
    const [Inst, setInst] = useState([]);
    const [loope, setLooper] = useState(' ');

    let ArraysQualification = [];
    const [arrayys, setArrayys] = useState([])

    // Qualification Array 
    const [qaulArray, setQualArray] = useState({
        student_id: " ",
        qualification_id: " ",
        qualification_name: " ",
        year: " ",
        institution_id: " ",
        institution_name: " ",
    })

    function removeQual(e, val) {
        e.preventDefault()

        let filtered = arrayys.filter(function (ele) {
            return ele != val
        })
        setArrayys(filtered);
    }
    function setInstname(event, value) {
        setQualArray(
            { ...qaulArray, institution_name: value })
    }
    function setQualname(event, value) {
        setQualArray(
            { ...qaulArray, qualification_name: value })
    }
    function handleQualAdd(e) {
        e.preventDefault()
        ArraysQualification.push(qaulArray)
        setArrayys(arrayys.concat(ArraysQualification))

        // console.log(arrayys)
    }

    let looperArray = []

    function looper() {
        if (looperArray.length >= 53) {
            setLooper(looperArray)
            // fetchData()
        } else {
            for (let i = 1970; i <= 2023; i++) {
                looperArray.push({ i })
                setLooper(looperArray)
                // fetchData()
            }
        }
    }

    const [lecturerInfo, setLecturerInfo] = useState({
        names: " ",
        email: " ",
        phone: " ",
        address: " ",
        faculty_id: "0",
        department_id: " ",
        programme_id: " ",
        occupation: " ",
        heighest_qualification: " ",
        center_id: " ",
        age: " "
    });

    const fetchData = () => {
        const allFaculties = `https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/${details.id}`
        const allPrograms = `https://stockmgt.gapaautoparts.com/api/center/GetAllLunchedProgrammeByCenterId/${details.id}`
        const allDepartment = `https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByFacultyId/${lecturerInfo.faculty_id}`
        const allQual = `https://stockmgt.gapaautoparts.com/api/GetAllQualifications`
        const allInstitutes = `https://stockmgt.gapaautoparts.com/api/GetAllinstitutions`

        const getAllPrograms = axios.get(allPrograms);
        const getAllDepartment = axios.get(allDepartment);
        const getAllFaculties = axios.get(allFaculties);
        const getAllQual = axios.get(allQual);
        const getAllInstitutes = axios.get(allInstitutes);
        axios.all([getAllPrograms, getAllDepartment, getAllFaculties, getAllQual, getAllInstitutes]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allDepartmentData = allData[1].data.result;
                const allFacultiesData = allData[2].data.result;
                const allQualData = allData[3].data.result;
                const allInstitutesData = allData[4].data.result;

                setProgram(allProgramsData)
                setDepartment(allDepartmentData)
                setFaculties(allFacultiesData)
                setqual(allQualData)
                setInst(allInstitutesData)
            })
        )
    }
    const handleLecturerReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", lecturerInfo.names);
        urlencoded.append("email", lecturerInfo.email);
        urlencoded.append("phone", lecturerInfo.phone);
        urlencoded.append("address", lecturerInfo.address);
        urlencoded.append("department_id", lecturerInfo.department_id);
        urlencoded.append("programme_id", lecturerInfo.programme_id);
        urlencoded.append("faculty_id", lecturerInfo.faculty_id);
        urlencoded.append("occupation", lecturerInfo.occupation);
        urlencoded.append("heighest_qualification", lecturerInfo.heighest_qualification);
        urlencoded.append("center_id", details.id);
        urlencoded.append("Authorization", `Bearer ${bearer}`)

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')
        const addLecturer = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddLecturer", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Lecturer Added Succesfully')
                Swal.fire({
                    title: 'Lecturer Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                router.push('/centers/lecturers')

            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'Lecturer Details Exists',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addLecturer()
    };

    useEffect(() => {
        fetchData()
    }, [lecturerInfo.faculty_id])

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
            Lecturer Registration Information
        </h3>
        <form className="card p-4" action="" onClick={looper} onSubmit={handleLecturerReg} >
            <div className="row">
                <div className=" col-6 mb-3">
                    <label htmlFor="fullname">Lecturer Name</label>
                    <input onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, names: e.target.value })}
                        type="text" name="fullname" className="form-control" />
                </div>
                <div className=" col-6 mb-3">
                    <label htmlFor="phone">Telephone number</label>
                    <input onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, phone: e.target.value })} type="number" name="phone" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, email: e.target.value })} type="text" name="email" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="age">Age</label>
                    <input onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, age: e.target.value })} type="number" name="age" className="form-control" />
                </div>
            </div>
            <div className="mb-3 row ">
                <div className="col-6 mb-3">
                    <label htmlFor="falculty">Faculty</label>
                    <select name="falculty" onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, faculty_id: e.target.value })} class="form-select" aria-label="Default select example"  >
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
                    <select name="department" onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, department_id: e.target.value })} class="form-select" aria-label="Default select example">

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
                    <select name="programme" onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, programme_id: e.target.value })} class="form-select" aria-label="Default select example">

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
                    <input onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, address: e.target.value })} type="text" name="address" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="academic">Highest Qualification</label>
                    <input onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, heighest_qualification: e.target.value })} type="text" name="academic" className="form-control" />
                </div>
                <div className=" mb-3">
                    <label htmlFor="occupation">Occupation</label>
                    <input onChange={(e) => setLecturerInfo(
                        { ...lecturerInfo, occupation: e.target.value })} type="text" name="occupation" className="form-control" />
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-3 mb-3">
                    <label htmlFor="qualification">Qualification</label>
                    <select required name="qualification" onChange={(e) => setQualArray(
                        { ...qaulArray, qualification_id: e.target.value }
                    )} class="form-select" aria-label="Default select example">

                        <option selected onClick={event => setQualname(event, 'Select your Qualification')}>Select your qualification</option>
                        {
                            qual.map(qual => {

                                return (
                                    <option onClick={event => setQualname(event, qual.qualification)} value={qual.id}>{qual.qualification}</option>

                                )
                            })
                        }
                    </select>
                </div>

                <div className="col-3 mb-3">
                    <label htmlFor="academic">Year Finished</label>
                    <select required onChange={(e) => setQualArray(
                        { ...qaulArray, year: e.target.value })} type='text' name="year_finished" className="form-control">
                        {loope == ' ' ?
                            <option value='2020'>Select Year Finished</option> :
                            loope.map(program => {
                                return (
                                    <option value={`${program.i}`}>{program.i}</option>

                                )
                            })

                        }
                    </select>
                    {/* <input required onChange={(e) => setQualArray(
                                            { ...qaulArray, year: e.target.value })} type="date" name="academic" className="form-control" /> */}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="institute">Institution</label>
                    <select required name="institute" onChange={(e) => setQualArray(
                        { ...qaulArray, institution_id: e.target.value })} class="form-select" aria-label="Default select example">
                        <option selected>Select your institution</option>
                        {
                            Inst.map(Inst => {
                                return (
                                    <option onClick={event => setInstname(event, Inst.name)} value={Inst.id}>{Inst.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-3 text-center"> <button onClick={handleQualAdd} className="btn  btn-dark"><Add /></button>
                </div>
            </div>
            <hr />
            {
                arrayys.map(array => {
                    return (
                        <div className="row">
                            <div className="col-3 mb-3">
                                <input required value={array.qualification_name} type="text" name="academic" className="form-control" />
                            </div>
                            <div className="col-3 mb-3">
                                <input required value={array.year} type="text" name="academic" className="form-control" />
                            </div>
                            <div className="col-3 mb-3">
                                <input required value={array.institution_name} type="text" name="academic" className="form-control" />
                            </div>
                            <div className="col-3 text-center">
                                <button onClick={e => removeQual(e, array)} className=" btn border border-0 text-danger"><RemoveCircle /></button>
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Submit</button>
            </div>
        </form>
    </>);
}

export default LecturerRegistration;