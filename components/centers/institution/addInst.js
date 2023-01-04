import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AddInst(props) {
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [Instinfo, setInstinfo] = useState({
        name: " ",
        center_id: " ",
    });
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);
    const handleFacultyReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("name", Instinfo.name);
        urlencoded.append("center_id", details.id);
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addFaculty = async () => {
            const response = await fetch('https://stockmgt.gapaautoparts.com/api/AddInstitution', requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Institution Added Succesfully')
                Swal.fire({
                    title: 'Institution Added Successfully',
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
            Add Institution
        </h3>
        <form className="card p-4" action="" onSubmit={handleFacultyReg}>
            <div className="mb-3">
                <label htmlFor="facultyTitle">Institution Name</label>
                <input onChange={(e) => setInstinfo(
                    { ...Instinfo, name: e.target.value })} type="text" name="facultyTitle" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Institution</button>
            </div>
        </form>
    </>);
}

export default AddInst;