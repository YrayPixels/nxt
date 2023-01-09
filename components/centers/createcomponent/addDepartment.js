import { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

function AddDepartment(props) {
    const { details, bearer } = props
    const [notify, setNotify] = useState(' ');
    const [faculty, setFaculty] = useState([]);
    const [deptInfo, setdeptInfo] = useState({
        depttitle: " ",
        deptcode: " ",
        faculty_id: " ",
    });
    const fetchData = () => {
        const allFaculty = `https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/${details.id}`
        const getallFaculty = axios.get(allFaculty);
        axios.all([getallFaculty]).then(
            axios.spread((...allData) => {
                const allFacultyData = allData[0].data.result;
                setFaculty(allFacultyData)
            })
        )
    }

    useEffect(() => {
        fetchData()
    }, [deptInfo.depttitle])

    const handleDeptReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", deptInfo.depttitle);
        urlencoded.append("code", deptInfo.deptcode);
        urlencoded.append("faculty_id", deptInfo.faculty_id);
        urlencoded.append("center_id", details.id);
        urlencoded.append("Authorization", `Bearer ${bearer}`)

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addDepartment = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddDepartment", requestOptions)
            const data = await response.json()
            const status = response.status;

            if (status == 200) {
                setNotify('Department Added Succesfully')
                Swal.fire({
                    title: 'Department Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                Router.push('/centers/department')
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured!!!',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addDepartment()
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
            Add Department
        </h3>
        <form className="card p-4" action="" onSubmit={handleDeptReg}>
            <div className="mb-3">
                <label htmlFor="depttitle">Department Name</label>
                <input onChange={(e) => setdeptInfo(
                    { ...deptInfo, depttitle: e.target.value })} type="text" name="depttitle" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="deptcode">Department Code</label>
                <input onChange={(e) => setdeptInfo(
                    { ...deptInfo, deptcode: e.target.value })} type="text" name="deptcode" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="falculty">Faculty</label>
                <select name="department" onChange={(e) => setdeptInfo(
                    { ...deptInfo, faculty_id: e.target.value })} class="form-select" aria-label="Default select example"  >
                    <option selected>Select your Faculty</option>
                    {
                        faculty.map(faculty => {
                            return (
                                <option value={faculty.id}>{faculty.title}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Department</button>
            </div>
        </form>
    </>);
}

export default AddDepartment;