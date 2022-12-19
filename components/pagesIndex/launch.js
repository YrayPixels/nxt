import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";


function Programlaunching() {
    const [notify, setNotify] = useState(' ');

    const [programs, setProgram] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);

    const [lecturerInfo, setLecturerInfo] = useState({
        announcement_date: " ",
        announcement_link: " ",
        programme_id: " ",
        start_date: " ",
        end_date: " ",
        center_id: " ",
    });

    const fetchData = () => {
        const allFaculties = "https://stockmgt.gapaautoparts.com/api/center/getAllFaculties"
        const allPrograms = "https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes"
        const allCourses = "https://stockmgt.gapaautoparts.com/api/center/getAllCourses"

        const getAllPrograms = axios.get(allPrograms);
        const getAllCourse = axios.get(allCourses);
        const getAllFaculties = axios.get(allFaculties);


        axios.all([getAllPrograms, getAllCourse, getAllFaculties]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allCoursesData = allData[1].data.result;
                const allFacultiesData = allData[2].data.result;

                setProgram(allProgramsData)
                setCourses(allCoursesData)
                setFaculties(allFacultiesData)
            })
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    const programlaunch = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("center_id", "1 ");
        urlencoded.append("programme_id", "1");
        urlencoded.append("start_date", "fqwe");
        urlencoded.append("end_date", "ewe");
        urlencoded.append("announcement_date", "fwef");
        urlencoded.append("announcement_link", "weewf");
        urlencoded.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM")

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        console.log(urlencoded)
        const addLecturer = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/LunchProgramme", requestOptions)
            const data = await response.json()

            if (data.message == 'Student Added Successfully') {
                setNotify(data.message)
            }
            return data
        }

        addLecturer()

    };
    return (<>
        {
            notify == 'Lecturer Added Successfully' && (
                <p className="text-success text-center fw-bold">Lecturer Added</p>)
        }
        <h3 className="py-4">
            Lauch A Programme
        </h3>
        <form className="card p-4" action="" onSubmit={programlaunch} >
            <div className="mb-3">
                <label htmlFor="programme">Programme</label>
                <select name="programme" onChange={(e) => setLecturerInfo(
                    { ...lecturerInfo, programme_id: e.target.value })} class="form-select" aria-label="Default select example">

                    <option selected>Select your programme</option>
                    {
                        programs.map(program => {
                            return (
                                <option value={program.id}>{program.title}</option>

                            )
                        })

                    }

                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="startdate">Start Date</label>
                <input onChange={(e) => setLecturerInfo(
                    { ...lecturerInfo, start_date: e.target.value })}
                    type="date" name="startdate" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="enddate">End Date</label>
                <input onChange={(e) => setLecturerInfo(
                    { ...lecturerInfo, end_date: e.target.value })}
                    type="date" name="enddate" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="date">Anouncement Date</label>
                <input onChange={(e) => setLecturerInfo(
                    { ...lecturerInfo, announcement_date: e.target.value })}
                    type="date" name="date" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="link">Announcement Link </label>
                <input onChange={(e) => setLecturerInfo(
                    { ...lecturerInfo, announcement_link: e.target.value })} type="text" name="link" className="form-control" />
            </div>





            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Submit</button>
            </div>
        </form>
    </>);
}

export default Programlaunching;