import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';
import { CircularProgress } from "@mui/material";
import FooterComp from "../components/footer";
import md5 from "md5";
import RightsideCenters from "../components/centers/loginComponent/rigthSide";
import speseeLogo from '../public/image/spesee.png'
import worldbank from '../public/image/worldBank.png'
import nuc from '../public/image/nuclogo.png'
import Image from "next/image";



function LoginComponent() {
    const router = useRouter();
    const [notify, setNotify] = useState(' ');
    const [loading, setLoading] = useState(' ');

    const [userInfo, setUserInfo] = useState({ email: " ", password: " " });
    function redirect() {
        router.replace('/centers/otp');
    }
    const handleSubmit = async (e) => {
        e.preventDefault()


        var urlencoded = new URLSearchParams();
        urlencoded.append("email", userInfo.email);
        urlencoded.append("password", userInfo.password);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setLoading('loading')

        const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/login", requestOptions)
        const data = await response.json()
        const status = response.status;
        if (status == 200) {
            setNotify(' ')
            Swal.fire({
                title: 'Logged In Succesfully',
                icon: 'success',
                confirmButtonText: 'close'
            })
            sessionStorage.setItem("bearer_token", data.barear_token);
            sessionStorage.setItem("dets", [JSON.stringify(data.message)]);
            sessionStorage.setItem("token_", [userInfo.password]);

            redirect()
        } else if (status == 201) {
            setNotify('Incorrect Details')
            setLoading('')
            Swal.fire({
                title: 'Incorrect Details',
                icon: 'error',
                confirmButtonText: 'close'
            })
        } else {
            setNotify('An Error has Occured')
        }
    }

    return (<>
        <div className="conttt">

            <div className="loginCont container py-sm-0">

                <div className="container py-sm-0">

                    <div className="center_login p-2 p-lg-5">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6 order-1 order-lg-0">
                                <h3 className="mb-5 fw-bold">CENTER FOR EXCELLENCE PORTAL (SPESSE)</h3>
                                {
                                    notify != ' ' && (
                                        <p className="text-danger fw-bold">{notify}</p>)
                                }
                                <h2>Sign In</h2>
                                <p>Enter the email and password provided to log in.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4  col-12 col-lg-6 ">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email"
                                            onChange={(e) => setUserInfo(
                                                { ...userInfo, email: e.target.value })}
                                            // value={userInfo.email}
                                            placeholder='enter your email address'
                                            className="form-control rounded-0" id="" />
                                    </div>
                                    <div className="mb-4 col-12 col-lg-6 ">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password"
                                            onChange={(e) => setUserInfo(
                                                { ...userInfo, password: e.target.value })}
                                            // value={userInfo.password}
                                            className="form-control rounded-0 " id="" />
                                    </div>
                                    <div className="form-check mb-4 form-switch">
                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                        <label htmlFor=""> Remember Me</label>
                                    </div>
                                    <div className="mb-4 col-12 col-lg-6 text-center">
                                        <button className="btn w-100 d-flex justify-content-center align-items-center rounded-0"
                                            type="submit" name="" id="">
                                            {
                                                loading == 'loading' && (<CircularProgress size='1.5rem' color="inherit" />)
                                            }Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-lg-6 order-0 order-lg-2 my-sm-0  py-sm-0 my-lg-5 py-lg-5">
                                <RightsideCenters spesee={speseeLogo} nuclogo={nuc} worldBank={worldbank} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center mt-5 pt-5">
                    <FooterComp />
                </div>

            </div >
        </div>

    </>

    );
}
export default LoginComponent;