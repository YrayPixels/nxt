import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Router from "next/router";


function CreateGradlistComp(props) {
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [session, setsession] = useState([])
    const [gradListInfo, setgradListInfo] = useState({
        center_id: " ",
        title: " ",
        session_id: " ",
        certificate: " ",
    });
    const sessionFetcher = () => {
        const coursesInCenter = `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`
        const getallCourse = axios.get(coursesInCenter);
        axios.all([getallCourse]).then(
            axios.spread((...allData) => {
                const allcourses = allData[0].data.session;
                setsession(allcourses)
            })
        )
    }

    useEffect(() => {
        if (session.length == 0 || session == []) {
            sessionFetcher()
        }

    })
    // console.log(courses)
    const handlecreateGradList = async (e) => {
        e.preventDefault()
        var urlencoded = new URLSearchParams();
        urlencoded.append("center_id", details.id);
        urlencoded.append("title", gradListInfo.title);
        urlencoded.append("session_id", gradListInfo.session_id);
        urlencoded.append("certificate", gradListInfo.certificate);
        urlencoded.append("Authorization", `Bearer ${bearer}`);
        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')
        const addGradList = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/CreateGraduatingList", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Graduation List Added Succesfully')
                Swal.fire({
                    title: 'Graduation List Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                Router.push('/centers/graduatinglist/all')
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addGradList()
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
            Create Graduation List
        </h3>
        <form className="card p-4" action="" onSubmit={handlecreateGradList}>
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input onChange={(e) => setgradListInfo(
                    { ...gradListInfo, title: e.target.value })} type="text" name="title" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="session">Session</label>
                <select onChange={(e) => setgradListInfo(
                    { ...gradListInfo, session_id: e.target.value })} type="text" name="session" className="form-control" >

                    <option value="">kindly select the session for this list</option>
                    {session.map(session => {
                        return (
                            <option value={session.id}>{session.session}</option>)
                    })

                    }

                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="certificate">Certificate Title</label>
                <input onChange={(e) => setgradListInfo(
                    { ...gradListInfo, certificate: e.target.value })} type="text" name="certificate" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Create </button>
            </div>
        </form>
    </>);
}

export default CreateGradlistComp;