import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Router from "next/router";


function AddCenterUserComp(props) {
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [centerUser, setcenterUser] = useState({
        email: " ",
        password: " ",
        name: " ",
        phone_number: " ",
    });

    const handleUserAdding = async (e) => {
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
        const addCenterUser = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/AddNewUser", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('User  Added Succesfully')
                Swal.fire({
                    title: 'User  Added Successfully',
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
        addCenterUser()
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
            Create Center User
        </h3>
        <form className="card p-4" action="" onSubmit={handleUserAdding}>
            <div className="mb-3">
                <label htmlFor="Email">Email</label>
                <input onChange={(e) => setcenterUser(
                    { ...centerUser, email: e.target.value })} type="text" name="Email" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="Password">Password</label>
                <input onChange={(e) => setcenterUser(
                    { ...centerUser, password_id: e.target.value })} type="password" name="Password" className="form-control" />


            </div>
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input onChange={(e) => setcenterUser(
                    { ...centerUser, name: e.target.value })} type="text" name="name" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input onChange={(e) => setcenterUser(
                    { ...centerUser, phone_number: e.target.value })} type="number" name="phone" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Create </button>
            </div>
        </form>
    </>);
}

export default AddCenterUserComp;