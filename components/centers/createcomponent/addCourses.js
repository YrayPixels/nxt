import { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

function AddCoursesComp(props) {
    const { details, bearer } = props
    const [notify, setNotify] = useState(' ');
    const [delay, setDelay] = useState(' ');
    const [department, setDepartment] = useState([]);
    const [courseInfo, setCourseInfo] = useState({
        coursetitle: " ",
        coursecode: " ",
        unit: " ",
        department_id: " ",
        node_id: " ",
    });
    const fetchData = () => {
        const allDept = `https://stockmgt.gapaautoparts.com/api/center/GetDepartmentByCenterId/${details.id}`
        const getAllDept = axios.get(allDept);
        axios.all([getAllDept]).then(
            axios.spread((...allData) => {
                const allDeptData = allData[0].data.result;
                setDepartment(allDeptData)
            })
        )
    }
    useEffect(() => {
        if (department.length == 0) {
            fetchData()
        }
    })

    const handleCourseReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", courseInfo.coursetitle);
        urlencoded.append("code", courseInfo.coursecode);
        urlencoded.append("department_id", courseInfo.department_id);
        urlencoded.append("unit", courseInfo.unit);
        urlencoded.append("center_id", details.id);
        urlencoded.append("node_id", courseInfo.node_id);
        urlencoded.append("Authorization", `Bearer ${bearer}`)

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addCourse = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddCourse", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Module Added Succesfully')
                Swal.fire({
                    title: 'Module Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                Router.push('/centers/modules')
            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured!!!',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addCourse()
    };
    // Pleae read this comment to understand my Code
    /*
    Courses was changed to modules in the UI, However the Api calls still calls to the courses routes. I had already designed the courses interface and states so instead of changing all to modules I only Improvised.

    this same thing also happes with programmes which now became courses, this you will see in launch program pages

    */
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
            Add Modules
        </h3>
        <form className="card p-4" action="" onSubmit={handleCourseReg}>
            <div className="mb-3">
                <label htmlFor="node">Node</label>
                <select name="node" onChange={(e) => setCourseInfo(
                    { ...courseInfo, node_id: e.target.value })} class="form-select" aria-label="Default select example">

                    <option selected>Select your Department</option>
                    {
                        department.map(department => {
                            return (
                                <option key={department.id} value={department.id}>{department.title}</option>

                            )
                        })


                    }

                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="department">Department</label>
                <select name="department" onChange={(e) => setCourseInfo(
                    { ...courseInfo, department_id: e.target.value })} class="form-select" aria-label="Default select example">

                    <option selected>Select your Department</option>
                    {
                        department.map(department => {
                            return (
                                <option key={department.id} value={department.id}>{department.title}</option>

                            )
                        })


                    }

                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="coursetitle">Module Title</label>
                <input onChange={(e) => setCourseInfo(
                    { ...courseInfo, coursetitle: e.target.value })} type="text" name="coursetitle" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="coursecode">Module Code</label>
                <input onChange={(e) => setCourseInfo(
                    { ...courseInfo, coursecode: e.target.value })} type="text" name="coursecode" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="unit">Unit</label>
                <input onChange={(e) => setCourseInfo(
                    { ...courseInfo, unit: e.target.value })} type="text" name="unit" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Course</button>
            </div>
        </form>
    </>);
}
export default AddCoursesComp;