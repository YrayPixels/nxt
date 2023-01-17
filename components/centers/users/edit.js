import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Router from "next/router";


function EditUserComp(props) {
    const { details, bearer, id } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [session, setsession] = useState([])
    const [delay, setDelay] = useState(' ')
    const [centerUser, setcenterUser] = useState({
        email: " ",
        password: " ",
        name: " ",
        phone_number: " ",
    });

    const sessionFetcher = () => {
        const coursesInCenter = `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`
        const singGradList = `https://stockmgt.gapaautoparts.com/api/ViewSingleUser/${id}`

        const getallCourse = axios.get(coursesInCenter);
        const getSingGradList = axios.get(singGradList);


        axios.all([getallCourse, getSingGradList]).then(
            axios.spread((...allData) => {
                const allcourses = allData[0].data.session;
                const GradList = allData[1].data.data[0];
                setsession(allcourses)
                setcenterUser({
                    email: GradList.email,
                    password: GradList.password,
                    name: GradList.name,
                    phone_number: GradList.phone_number,
                });
            })
        )

    }
    useEffect(() => {
        if (session.length == 0) {
            sessionFetcher()
        }
    })


    const handleEditList = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("center_id", details.id);
        urlencoded.append("name", centerUser.name);
        urlencoded.append("email", centerUser.email);
        urlencoded.append("password", centerUser.password);
        urlencoded.append("phone_number", centerUser.phone_number);
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addGradList = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/EditCenterUser/${id}`, requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('User Edited Succesfully')
                Swal.fire({
                    title: 'User Edited Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                Router.push('/centers/users/all')
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
                <label htmlFor="Email">Email</label>
                <input value={centerUser.email} onChange={(e) => setcenterUser(
                    { ...centerUser, email: e.target.value })} type="text" name="Email" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="Password">Password</label>
                <input onChange={(e) => setcenterUser(
                    { ...centerUser, password: e.target.value })} type="password" name="Password" className="form-control" />


            </div>
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input value={centerUser.name} onChange={(e) => setcenterUser(
                    { ...centerUser, name: e.target.value })} type="text" name="name" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input value={centerUser.phone_number} onChange={(e) => setcenterUser(
                    { ...centerUser, phone_number: e.target.value })} type="number" name="phone" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Save </button>
            </div>
        </form>
    </>);
}

export default EditUserComp;