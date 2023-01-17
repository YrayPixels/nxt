import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Add, PlusOneOutlined, Remove, RemoveCircle } from "@mui/icons-material";
import Home from "@mui/icons-material/Home";

function EditStudentComp(props) {
    const router = useRouter()
    const { details, bearer, id } = props;
    const [bearer_key, setBearer_key] = useState(' ');
    const [notify, setNotify] = useState(' ');
    const [programs, setProgram] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [department, setDepartment] = useState([]);
    const [qual, setqual] = useState([]);
    const [Inst, setInst] = useState([]);

    // Qualification Array 
    const [qaulArray, setQualArray] = useState({
        student_id: " ",
        qualification_id: " ",
        qualification_name: " ",
        year: " ",
        institution_id: " ",
        institution_name: " ",
    })
    let ArraysQualification = [];
    const [arrayys, setArrayys] = useState([])
    const [lga, setLga] = useState([]);
    const [state, setStateDa] = useState([]);
    const [stdData, setStdData] = useState(' ');
    const [faculty_id, setFaculty_id] = useState([]);
    // const [nationality, setNationality] = useState([])
    const [courses, setCourses] = useState([]);
    const [userInfo, setUserInfo] = useState({
        names: " ",
        email: " ",
        phone: " ",
        address: " ",
        faculty_id: "0",
        department_id: "0",
        programme_id: " ",
        heighest_qualification: " ",
        center_id: details.id,
        age: " ",
        sex: "",
        Nationality: " ",
        state: "0",
        lga: " ",
        level: " ",
        heighest_qualification_year: " ",
        employee: " ",
        employee_type: "",
        employment_status: " ",
        nationality: " ",
    });
    const { session, status } = useSession();
    const [loope, setLooper] = useState(' ');
    let looperArray = []


    const stdDataS = () => {
        var config = {
            method: 'get',
            url: `https://stockmgt.gapaautoparts.com/api/center/ViewStudent/${id}`,
            headers: {
                'Authorization': `Bearer ${bearer_key}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        axios(config)
            .then(function (response) {
                const data = response.data;
                setUserInfo({
                    names: data.students.name,
                    email: data.students.email,
                    phone: data.students.phone,
                    address: data.students.address,
                    faculty_id: data.students.faculty_id,
                    department_id: data.students.department_id,
                    programme_id: data.students.programme_id,
                    heighest_qualification: data.students.heighest_qualification,
                    center_id: details.id,
                    age: data.students.age,
                    sex: data.students.sex,
                    Nationality: data.students.Nationality,
                    state: data.students.state_id,
                    lga: data.students.lga_id,
                    level: data.students.level,
                    heighest_qualification_year: data.students.heighest_qualification_year,
                    employee: data.students.employee,
                    employee_type: data.students.employee_type,
                    employment_status: data.students.employment_status,
                })
                // setStdQual(data.qualifications)
                // console.log(data)
                return data;

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        if (userInfo.names == ' ') {
            stdDataS()
        }
    })


    function looper() {
        if (looperArray.length >= 53) {
            setLooper(looperArray)
        } else {
            for (let i = 1970; i <= 2023; i++) {
                looperArray.push({ i })
                setLooper(looperArray)
            }
        }
    }
    const fetchData = () => {
        const allFaculties = `https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/${details.id}`
        const allPrograms = "https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes"
        const allCourses = `https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/${details.id}`
        const allDept = `https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByFacultyId/${userInfo.faculty_id}`
        const allStates = "https://stockmgt.gapaautoparts.com/api/getAllStates"
        const allLga = `https://stockmgt.gapaautoparts.com/api/getLGA/${userInfo.state}`
        const allQual = `https://stockmgt.gapaautoparts.com/api/GetAllQualifications`
        const allInstitutes = `https://stockmgt.gapaautoparts.com/api/GetAllinstitutions`

        const getAllPrograms = axios.get(allPrograms);
        const getAllCourse = axios.get(allCourses);
        const getAllFaculties = axios.get(allFaculties);
        const getAllDept = axios.get(allDept);
        const getAllStates = axios.get(allStates);
        const getAllLga = axios.get(allLga);
        const getAllQual = axios.get(allQual);
        const getAllInstitutes = axios.get(allInstitutes);

        axios.all([getAllPrograms, getAllCourse, getAllFaculties, getAllDept, getAllStates, getAllLga, getAllQual, getAllInstitutes]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allCoursesData = allData[1].data.result;
                const allFacultiesData = allData[2].data.result;
                const allDeptData = allData[3].data.result;
                const allStateData = allData[4].data.result;
                const allLgaData = allData[5].data.result;
                const allQualData = allData[6].data.result;
                const allInstitutesData = allData[7].data.result;

                setProgram(allProgramsData)
                setCourses(allCoursesData)
                setFaculties(allFacultiesData)
                setDepartment(allDeptData)
                setStateDa(allStateData)
                setLga(allLgaData)
                setqual(allQualData)
                setInst(allInstitutesData)
            })
        )
    }

    useEffect(() => {
        if (userInfo.names == ' ') {
            stdDataS()
            fetchData()
        }
    })
    useEffect(() => {
        fetchData()
    }, [userInfo.state, userInfo.faculty_id])
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

        console.log(arrayys)
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
        urlencoded.append("center_id", details.id);
        urlencoded.append("Authorization", `Bearer ${bearer}`)
        urlencoded.append("sex", userInfo.sex);
        urlencoded.append("age", userInfo.age);
        urlencoded.append("Nationality", userInfo.Nationality);
        urlencoded.append("state", userInfo.state);
        urlencoded.append("lga", userInfo.lga);
        urlencoded.append("heighest_qualification_year", userInfo.heighest_qualification_year);
        urlencoded.append("employee", userInfo.employee);
        urlencoded.append("employee_type", userInfo.employee_type);
        urlencoded.append("employment_status", userInfo.employment_status);
        urlencoded.append('level', userInfo.level);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        setNotify('loading')
        const addStudent = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/editStudent/${id}`, requestOptions)
            const data = await response.json()
            const status = response.status;
            let student = data.student;
            console.log(data)
            if (status == 200) {
                setNotify('Student Details Edited Succesfully')
                Swal.fire({
                    title: 'Student Details Edited Succesfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })

                arrayys.map(qual => {
                    var urlencoded = new URLSearchParams();
                    urlencoded.append("student_id", student.id);
                    urlencoded.append("qualification_id", qual.qualification_id);
                    urlencoded.append("year", qual.year);
                    urlencoded.append("institution_id", qual.institution_id);

                    var requestOptions = {
                        method: 'POST',
                        body: urlencoded,
                        redirect: 'follow'
                    };

                    fetch("https://stockmgt.gapaautoparts.com/api/center/addStudentQualification", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                    return 0

                })
                router.push('/centers/studentlist')
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
                <p className="text-success  text-center fw-bold"><CircularProgress /></p>
            )
        }
        {
            notify != ' ' && (
                <p className="text-success text-center fw-bold">{notify}</p>)
        }
        <h3 className="py-4 d-flex align-items-center">
            Edit Student Details Information
        </h3>
        <form className="card p-4" action="" onSubmit={handleStudentReg} >
            <fieldset className="row">
                <legend>Personal Data</legend>
                <div className="col-6 mb-3">
                    <label htmlFor="fullname">Student Name</label>
                    <input value={userInfo.names} onChange={(e) => setUserInfo(
                        { ...userInfo, names: e.target.value })}
                        required type="text" name="fullname" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="phone">Telephone number</label>
                    <input value={userInfo.phone} onChange={(e) => setUserInfo(
                        { ...userInfo, phone: e.target.value })} type="number" required name="phone" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="email">Email</label>
                    <input value={userInfo.email} onChange={(e) => setUserInfo(
                        { ...userInfo, email: e.target.value })} type="text" required name="email" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="age">Age</label>
                    <input value={userInfo.age} required onChange={(e) => setUserInfo(
                        { ...userInfo, age: e.target.value })} type="number" name="age" className="form-control" max={90} min={10} >
                        {/* <option value="option your age"> option your age</option>
                        {
                            looperArray.map(age => {
                                return <option>{age}</option>
                            })
                        } */}
                    </input>
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="nationality">Nationality</label>
                    <select value={userInfo.Nationality} required name="nationality" onChange={(e) => setUserInfo(
                        { ...userInfo, Nationality: e.target.value })} class="form-select" aria-label="Default select example"  >
                        <option selected value={0}>Select your Nationality</option>
                        <option value={'Nigeria'}>Nigeria</option>
                        <option value={'Foreign'}>Foreign</option>
                    </select>
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="state">State of Origin</label>
                    <select value={userInfo.state_id} required name="state" onChange={(e) => setUserInfo(
                        { ...userInfo, state: e.target.value })} class="form-select" aria-label="Default select example"  >

                        <option selected value={0}>Select your State</option>
                        {
                            state.map(State => {
                                return (
                                    <option key={State.id} value={State.id}>{State.title}</option>

                                )
                            })

                        }

                    </select>
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="lga">LGA</label>
                    <select value={userInfo.lga} required name="lga" onChange={(e) => setUserInfo(
                        { ...userInfo, lga: e.target.value })} class="form-select" aria-label="Default select example"  >
                        <option selected>Select your LGA</option>
                        {
                            lga.map(lga => {
                                return (
                                    <option key={lga.id} value={lga.id}>{lga.Lga}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className=" col-6 mb-3">
                    <label htmlFor="sex">Gender</label>
                    <select value={userInfo.sex} required onChange={(e) => setUserInfo(
                        { ...userInfo, sex: e.target.value })} type="text" name="address" className="form-control" >
                        <option value="none" selected>Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <textarea value={userInfo.address} required onChange={(e) => setUserInfo(
                        { ...userInfo, address: e.target.value })} type="text" name="address" className="form-control" > </textarea>
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
                        <select value={userInfo.faculty_id} required name="department" onChange={(e) => setUserInfo(
                            { ...userInfo, faculty_id: e.target.value })} class="form-select" aria-label="Default select example"  >

                            <option selected value={0}>Select your Faculty</option>
                            {
                                faculties.map(faculty => {
                                    return (
                                        <option key={faculty.id} value={faculty.id}>{faculty.title}</option>

                                    )
                                })

                            }

                        </select>
                    </div>

                    <div className="col-6 mb-3">
                        <label htmlFor="department">Department</label>
                        <select value={userInfo.department_id} required name="department" onChange={(e) => setUserInfo(
                            { ...userInfo, department_id: e.target.value })} class="form-select" aria-label="Default select example">

                            <option selected value={0}>Select your Department</option>
                            {
                                department.map(department => {
                                    return (
                                        <option key={department.id} value={department.id}>{department.title}</option>

                                    )
                                })


                            }

                        </select>
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="programme">Programme</label>
                        <select value={userInfo.programme_id} required name="programme" onChange={(e) => setUserInfo(
                            { ...userInfo, programme_id: e.target.value })} class="form-select" aria-label="Default select example">

                            <option selected>Select your program</option>
                            {
                                programs.map(program => {
                                    return (
                                        <option key={program.id} value={program.id}>{program.title}</option>

                                    )
                                })

                            }

                        </select>
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="level">Level </label>
                        <select required value={userInfo.level} onChange={(e) => setUserInfo(
                            { ...userInfo, level: e.target.value })} type='text' name="level" className="form-control" >

                            <option value={'2020'}>Kindly select your level</option>
                            <option value="100">Year 1</option>
                            <option value="200">Year 2</option>
                            <option value="300">Year 3</option>
                            <option value="400">Year 4</option>
                            <option value="500">Year 5</option>

                        </select>
                    </div>
                    <form className="qualification date">
                        <fieldset><legend>Educational Qualifications</legend>
                            <div className="row align-items-center">
                                <div className="col-6 mb-3">
                                    <label htmlFor="highest_qualifcation">Highest Qualifcation</label>
                                    <select value={userInfo.heighest_qualification} onClick={looper} required name="highest_qualifcation" onChange={(e) => setUserInfo(
                                        { ...userInfo, heighest_qualification: e.target.value }
                                    )} class="form-select" aria-label="Default select example">

                                        <option value={'None'}>Select your qualification</option>
                                        <option value="SSCE">SSCE</option>
                                        <option value="HND">HND</option>
                                        <option value="BSC">BSC</option>
                                        <option value="MSC">MSC</option>
                                        <option value="PHD">PHD</option>



                                    </select>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="year_finished">Year Finished</label>
                                    <select value={userInfo.heighest_qualification_year} required onChange={(e) => setUserInfo(
                                        { ...userInfo, heighest_qualification_year: e.target.value })} type='text' name="year_finished" className="form-control" >
                                        {loope == ' ' ? <option > none </option> :
                                            loope.map(program => {
                                                return (
                                                    <option value={`${program.i}`}>{program.i}</option>

                                                )
                                            })

                                        }
                                    </select>
                                </div>



                            </div>
                            <div className="row align-items-center">
                                <div className="col-3 mb-3">
                                    <label htmlFor="qualification">Qualification</label>
                                    <select required value={userInfo.qualification_id} name="qualification" onChange={(e) => setQualArray(
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
                        </fieldset>
                    </form>
                </div>
            </fieldset>
            {/* Employment Info */}
            <fieldset>
                <legend>
                    Employment Information
                </legend>
                <div className="mb-3">
                    <label htmlFor="employmentStatus">Employment Status</label>
                    <select required value={userInfo.employment_status} name="employmentStatus" onChange={(e) => setUserInfo(
                        { ...userInfo, employment_status: e.target.value })} class="form-select" aria-label="employement status" >
                        <option selected  >What's your employent Status</option>
                        <option value={'Employed'}>Employed</option>
                        <option value={'Unemployed'} >Unemployed</option>
                    </select>
                </div>
                {
                    userInfo.employment_status == 'Employed' &&
                    <div className="mb-3 row ">
                        <div className="col-6 mb-3">
                            <label htmlFor="Employee">Employee</label>
                            <input value={userInfo.employee} placeholder="where do you work" required name="employee" onChange={(e) => setUserInfo(
                                { ...userInfo, employee: e.target.value })} class="form-control" aria-label="" />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="EmployeeType">Employee Type</label>
                            <select value={userInfo.employee_type} required name="employeeType" onChange={(e) => setUserInfo(
                                { ...userInfo, employee_type: e.target.value })} class="form-control" aria-label="Default select example">
                                <option selected value={'None'}> What type of organization do you work for</option>
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>
                    </div>
                }
                <div className="col-5 m-auto singleSubmits">
                    <button type="submit" className="btn rounded-0  text-info w-100"> Submit</button>
                </div>
            </fieldset>
        </form>
    </>);
}
export default EditStudentComp;