import { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

function StartModules(props) {
    const { details, bearer } = props
    const [notify, setNotify] = useState(' ');
    const [delay, setDelay] = useState(' ');
    const [session, setSession] = useState([]);
    const [module, setModule] = useState([]);
    const [startsesion, setstartsesion] = useState({
        session_id: " ",
        course_id: " ",
        offering_per_year: " ",
        delivery_date: " ",
    });
    // console.log(module)
    const fetchData = () => {
        const allSession = `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`
        const allModules = `https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/${details.id}`

        const getallSession = axios.get(allSession);
        const getallModules = axios.get(allModules);

        axios.all([getallSession, getallModules]).then(
            axios.spread((...allData) => {
                const allSessionData = allData[0].data.session;
                const allModuleData = allData[1].data.result;
                setSession(allSessionData)
                setModule(allModuleData)
            })
        )
    }


    useEffect(() => {
        if (module.length == 0) {
            fetchData()
        }
    })


    const handleStartModule = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("session_id", startsesion.session_id);
        urlencoded.append("course_id", startsesion.course_id);
        urlencoded.append("offering_per_year", startsesion.offering_per_year);
        urlencoded.append("first_delivery_date", startsesion.delivery_date);
        urlencoded.append("Authorization", `Bearer ${bearer}`)

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const startCourse = async () => {
            // console.log(startsesion)
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/start_course", requestOptions)
            const data = await response.json()
            const status = response.status;
            // console.log(data)
            if (status == 200) {
                setNotify('Module Started')
                Swal.fire({
                    title: 'Module Started Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                Router.push('/centers/modules')
            } else if (status == 201) {
                setNotify('Module Already Started')
                Swal.fire({
                    title: 'Module Already Started',
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
        startCourse()
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
            Start Module
        </h3>
        <form className="card p-4" action="" onSubmit={handleStartModule}>
            <div className="mb-3">
                <label htmlFor="node">Session you're starting module on</label>
                <select name="node" onChange={(e) => setstartsesion(
                    { ...startsesion, session_id: e.target.value })} class="form-select" aria-label="Default select example">

                    <option selected>Select session</option>
                    {
                        session.map(dat => {
                            return (
                                <option value={dat.id}>{dat.session}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="department">Course you are starting module on</label>
                <select name="department" onChange={(e) => setstartsesion(
                    { ...startsesion, course_id: e.target.value })} class="form-select" aria-label="Default select example">
                    <option selected>Select Course</option>
                    {
                        module.map(dat => {
                            return (
                                <option value={dat.id}>{dat.title}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="coursetitle">Offering Per Year</label>
                <select onChange={(e) => setstartsesion(
                    { ...startsesion, offering_per_year: e.target.value })} type="text" name="coursetitle" className="form-select" >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9 </option>
                    <option value="10">10</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="coursecode">First Delivery Date</label>
                <input onChange={(e) => setstartsesion(
                    { ...startsesion, delivery_date: e.target.value })} type="date" name="coursecode" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Start</button>
            </div>
        </form>
    </>);
}
export default StartModules;