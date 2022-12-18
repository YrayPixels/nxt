import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";

function AddDepartment() {
    const [notify, setNotify] = useState(' ');
    const [faculty, setFaculty] = useState([]);
    const [deptInfo, setdeptInfo] = useState({
        depttitle: " ",
        deptcode: " ",
        faculty_id: " ",
    });
    const fetchData = () => {
        const allFaculty = "https://stockmgt.gapaautoparts.com/api/center/GetFacultyByCenterId/1"
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
    }, [])

    const handleDeptReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", deptInfo.depttitle);
        urlencoded.append("code", deptInfo.deptcode);
        urlencoded.append("faculty_id", deptInfo.faculty_id);
        urlencoded.append("center_id", 1);
        urlencoded.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM")

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        console.log(urlencoded)
        const addDepartment = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddDepartment", requestOptions)
            const data = await response.json()

            if (data.message == 'Student Added Successfully') {
                setNotify(data.message)
            }
            return data
        }
        addDepartment()
    };

    return (<>
        {
            notify == 'Student Added Successfully' && (
                <p className="text-success text-center fw-bold">Course Added</p>)
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