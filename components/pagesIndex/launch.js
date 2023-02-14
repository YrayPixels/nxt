import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";


function Programlaunching(props) {
    const { details, bearer } = props
    const [notify, setNotify] = useState(' ');

    const [programs, setProgram] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [session, setSession] = useState([]);


    const [launchInfo, setlaunchInfo] = useState({
        announcement_date: " ",
        announcement_link: " ",
        programme_id: " ",
        session_id: " ",
        start_date: " ",
        end_date: " ",
        center_id: ' ',
        other_media_link: " ",
    });

    const fetchData = () => {
        const allFaculties = "https://stockmgt.gapaautoparts.com/api/center/getAllFaculties"
        const allPrograms = "https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes"
        const allSession = `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`

        const getAllPrograms = axios.get(allPrograms);
        const getAllSession = axios.get(allSession);
        const getAllFaculties = axios.get(allFaculties);


        axios.all([getAllPrograms, getAllSession, getAllFaculties]).then(
            axios.spread((...allData) => {
                const allProgramsData = allData[0].data.result;
                const allSessionData = allData[1].data.session;
                const allFacultiesData = allData[2].data.result;

                setProgram(allProgramsData)
                setSession(allSessionData)
                setFaculties(allFacultiesData)
            })
        )
    }
    useEffect(() => {
        if (programs.length == 0) {
            fetchData()
        }
    })



    const programlaunch = async (e) => {
        e.preventDefault();

        var urlencoded = new URLSearchParams();
        urlencoded.append("center_id", details.id);
        urlencoded.append("programme_id", launchInfo.programme_id);
        urlencoded.append("start_date", launchInfo.start_date);
        urlencoded.append("end_date", launchInfo.end_date);
        urlencoded.append("session_id", launchInfo.session_id);
        urlencoded.append("announcement_date", launchInfo.announcement_date);
        urlencoded.append("announcement_link", launchInfo.announcement_link);
        urlencoded.append("other_media_link", launchInfo.other_media_link);
        urlencoded.append("Authorization", `Bearer ${bearer}`)

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        setNotify('loading')


        const programlaunching = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/LunchProgramme", requestOptions)
            const data = await response.json()
            const status = response.status;

            console.log('e no wrrk');
            if (status == 200) {
                setNotify('Program Launched')
                Swal.fire({
                    title: 'Program Launched Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured!!!',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }

        programlaunching()

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
            Lauch A Course
        </h3>
        <form className="card p-4" action="" onSubmit={programlaunch}>
            <div className="mb-3">
                <label htmlFor="programme">Course</label>
                <select name="programme" onChange={(e) => setlaunchInfo(
                    { ...launchInfo, programme_id: e.target.value })} class="form-select" aria-label="Default select example">

                    <option selected>Select your course</option>
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
                <label htmlFor="session">Session</label>
                <select name="session" onChange={(e) => setlaunchInfo(
                    { ...launchInfo, session_id: e.target.value })} class="form-select" aria-label="Default select example">

                    <option selected>Select your session</option>
                    {
                        session.map(session_id => {
                            return (
                                <option value={session_id.id}>{session_id.session}</option>

                            )
                        })

                    }

                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="startdate">Start Date</label>
                <input onChange={(e) => setlaunchInfo(
                    { ...launchInfo, start_date: e.target.value })}
                    type="date" name="startdate" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="enddate">End Date</label>
                <input onChange={(e) => setlaunchInfo(
                    { ...launchInfo, end_date: e.target.value })}
                    type="date" name="enddate" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="date">Anouncement Date</label>
                <input onChange={(e) => setlaunchInfo(
                    { ...launchInfo, announcement_date: e.target.value })}
                    type="date" name="date" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="link">Announcement Link </label>
                <input onChange={(e) => setlaunchInfo(
                    { ...launchInfo, announcement_link: e.target.value })} type="text" name="link" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="mediaLink">Other Media Link </label>
                <input onChange={(e) => setlaunchInfo(
                    { ...launchInfo, other_media_link: e.target.value })} type="text" name="mediaLink" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Submit</button>
            </div>
        </form>
    </>);
}

export default Programlaunching;