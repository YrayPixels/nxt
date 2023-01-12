import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Router from "next/router";


function EditGradListComp(props) {
    const { details, bearer, id } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [session, setsession] = useState([])
    const [delay, setDelay] = useState(' ')
    const [gradListInfo, setgradListInfo] = useState({
        center_id: " ",
        title: " ",
        session_id: " ",
        certificate: " ",
    });

    const sessionFetcher = () => {
        const coursesInCenter = `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`
        const singGradList = `https://stockmgt.gapaautoparts.com/api/GetSingleGraduatingList/${id}`

        const getallCourse = axios.get(coursesInCenter);
        const getSingGradList = axios.get(singGradList);


        axios.all([getallCourse, getSingGradList]).then(
            axios.spread((...allData) => {
                const allcourses = allData[0].data.session;
                const GradList = allData[1].data.data[0];
                setsession(allcourses)
                setgradListInfo({
                    title: GradList.title,
                    session_id: GradList.session_id,
                    certificate: GradList.certificate
                })
            })
        )

    }
    // sessionFetcher()

    // if (gradListInfo.title == ' ') {
    //     setInterval(() => {
    //         setDelay(Math.random())
    //     }, 2000);
    // } else {
    //     setDelay('stable')
    // }
    const fetchdata = () => {
        sessionFetcher()
    }

    // console.log(courses)
    const handleEditList = async (e) => {
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
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/EditGraduatingList/${id}`, requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Graduation List Edited Succesfully')
                Swal.fire({
                    title: 'Graduation List Edited Successfully',
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
            Edit Graduation List
        </h3>
        <form className="card p-4" action="" onSubmit={handleEditList}>
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input onClick={fetchdata} value={gradListInfo.title} onChange={(e) => setgradListInfo(
                    { ...gradListInfo, title: e.target.value })} type="text" name="title" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="session">Session</label>
                <select value={gradListInfo.session_id} onChange={(e) => setgradListInfo(
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
                <input value={gradListInfo.certificate} onChange={(e) => setgradListInfo(
                    { ...gradListInfo, certificate: e.target.value })} type="text" name="certificate" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Create</button>
            </div>
        </form>
    </>);
}

export default EditGradListComp;