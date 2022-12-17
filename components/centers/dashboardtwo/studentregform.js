import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";



const getCourses = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/getAllCourses", requestOptions)
    const data = await response.json()
    return data
}

function StudentRegistration() {

    const [programs, setProgram] = useState([]);
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
    });

    const fetchData = () => {
        const allPrograms = "https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes"
        const allCourses = "https://stockmgt.gapaautoparts.com/api/center/getAllCourses"

        const getAllPrograms = axios.get(allPrograms);
        const getAllCourse = axios.get(allCourses);

        axios.all([getAllCourse, getAllPrograms]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allCoursesData = allData[1].data.result;

                setProgram(allProgramsData)
                setCourses(allCoursesData)
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
        urlencoded.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM")

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        const fetcher = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddNewStudent", requestOptions)
            const data = await response.json()
            console.log(data)
        }

    };
    return (<>
        <h3 className="py-4">
            Student Registration Information
        </h3>
        <form className="card p-4" action="" onSubmit={handleStudentReg} >

            <div className="row col-6 align-items-center">
                <div className="profileImg col-5">
                    <img src="" alt="" />
                </div>
                <div className="col-5">
                    Upload Image
                    <button>Browse</button>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="fullname">Trainee Name</label>
                <input onChange={(e) => setUserInfo(
                    { ...userInfo, names: e.target.value })}
                    type="text" name="fullname" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone">Telephone number</label>
                <input onChange={(e) => setUserInfo(
                    { ...userInfo, phone: e.target.value })} type="text" name="phone" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setUserInfo(
                    { ...userInfo, email: e.target.value })} type="text" name="email" className="form-control" />
            </div>

            <div className="mb-3 row ">
                <div className="col-6 mb-3">
                    <label htmlFor="falculty">Falculty</label>
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, faculty_id: e.target.value })} type="text" name="falculty" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="age">Age</label>
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, email: e.target.value })} type="text" name="age" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="department">Department</label>
                    <select name="department" onChange={(e) => setUserInfo(
                        { ...userInfo, programme_id: e.target.value })} class="form-select" aria-label="Default select example">

                        <option selected>Select your Department</option>
                        {
                            courses.map(course => {
                                return (
                                    <option value={course.id}>{course.title}</option>

                                )
                            })

                        }

                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="programme">Programme</label>
                    <select name="programme" onChange={(e) => setUserInfo(
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
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, address: e.target.value })} type="text" name="address" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="academic">Highest Qualification</label>
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, heighest_qualification: e.target.value })} type="text" name="academic" className="form-control" />
                </div>
                <div className="col-6 mb-3">
                    <label htmlFor="employementStatus">Employement Status</label>
                    <input onChange={(e) => setUserInfo(
                        { ...userInfo, occupation: e.target.value })} type="text" name="employementStatus" className="form-control" />
                </div>
                <div className="col-6 mb-3">

                    <label htmlFor="occupation">Occupation</label>
                    <input onChange={(e) => setUserInfo(
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