import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import axios from "axios";


function AddNodeComp(props) {
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [courses, setCourses] = useState([])

    const [nodeInfo, setnodeInfo] = useState({
        center_id: " ",
        session: " ",
        session_start: " ",
        session_end: " ",
    });

    const coursesdataFetcher = () => {
        const coursesInCenter = `https://stockmgt.gapaautoparts.com/api/admin/getAllProgrammes`

        const getallCourse = axios.get(coursesInCenter);

        axios.all([getallCourse]).then(
            axios.spread((...allData) => {
                const allcourses = allData[0].data;

                setCourses(allcourses)
            })
        )

    }
    useEffect(() => {
        coursesdataFetcher
    }
        , [])
    console.log(courses)
    const handleAddSession = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("center_id", details.id);
        urlencoded.append("session", nodeInfo.session);
        urlencoded.append("session_start", nodeInfo.session_start);
        urlencoded.append("session_end", nodeInfo.session_end);
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addSession = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/AddNode", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Node Added Succesfully')
                Swal.fire({
                    title: 'Node Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addSession()
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
            Add Node
        </h3>
        <form className="card p-4" action="" onSubmit={handleAddSession}>
            <div className="mb-3">
                <label htmlFor="session">Node</label>
                <input onChange={(e) => setnodeInfo(
                    { ...nodeInfo, session: e.target.value })} type="text" name="session" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="programme_id">Course</label>
                <select onChange={(e) => setnodeInfo(
                    { ...nodeInfo, programme_id: e.target.value })} type="text" name="programme_id" className="form-control" >

                    <option value="">kindly select the course for this node</option>

                    {
                        courses.map(
                            course => {
                                <option value=""></option>
                            }
                        )
                    }

                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="date_announcement">Announcement Date</label>
                <input onChange={(e) => setnodeInfo(
                    { ...nodeInfo, date_announcement: e.target.value })} type="date" name="date_announcement" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Node</button>
            </div>
        </form>
    </>);
}

export default AddNodeComp;