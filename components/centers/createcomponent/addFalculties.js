import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AddFaculty(props) {
    const router = useRouter()
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [deptInfo, setdeptInfo] = useState({
        facultyTitle: " ",
        facultyCode: " ",
    });
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);
    // console.log(details.id)
    const handleFacultyReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", deptInfo.facultyTitle);
        urlencoded.append("code", deptInfo.facultyCode);
        urlencoded.append("center_id", details.id);
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addFaculty = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddFaculty", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Faculty Added Succesfully')
                Swal.fire({
                    title: 'Faculty Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                router.push('/centers/faculties')

            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addFaculty()
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
            Add Faculty
        </h3>
        <form className="card p-4" action="" onSubmit={handleFacultyReg}>
            <div className="mb-3">
                <label htmlFor="facultyTitle">Faculty Name</label>
                <input onChange={(e) => setdeptInfo(
                    { ...deptInfo, facultyTitle: e.target.value })} type="text" name="facultyTitle" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="facultyCode">Faculty Code</label>
                <input onChange={(e) => setdeptInfo(
                    { ...deptInfo, facultyCode: e.target.value })} type="text" name="facultyCode" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Faculty</button>
            </div>
        </form>
    </>);
}

export default AddFaculty;