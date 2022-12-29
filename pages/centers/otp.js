import Script from 'next/script'
import RightsideCenters from "/components/centers/loginComponent/rigthSide";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Head from 'next/head'
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';



function Otp() {
    const router = useRouter();
    const [bearer_key, setBearer_key] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [state, setState] = useState({ otp: "" });
    // const [otpstate, setotpState] = useState([])
    const [notify, setNotify] = useState(' ')
    const [loading, setLoading] = useState(' ');

    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setPassword(window.sessionStorage.getItem('token_'));
            setEmail(window.sessionStorage.getItem('user_email'));


        }
    }, []);
    const [otp, setOtp] = useState([])
    const [filled, setFilled] = useState([])
    useEffect(() => {
        setOtp(filled.join(''))

    }, [filled])

    let inputArray = []
    function handleInput(e) {
        let inputVal = e.target.value;

        if (inputVal != [] && inputVal.length == 1) {
            if (e.target.nextSibling != null) {
                e.target.nextSibling.focus()
                setFilled(filled.concat(inputVal))

            } else {
                inputArray.push(inputVal)
                setFilled(filled.concat(inputVal))
                // setFilled(filled.join(''))
            }
        } else {
            if (e.target.previousSibling != null) {
                e.target.previousSibling.focus()
            } else {
                setFilled([])
            }
        }
    }
    function redirect() {
        router.replace('/centers/dashboard');
    }

    const verifyOtp = async () => {
        setNotify(' ')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearer_key}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("otp", otp);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        setLoading('loading')
        const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/otp", requestOptions)
        const data = await response.json()
        const status = response.status
        if (status == 200) {
            setNotify(' ')
            Swal.fire({
                title: 'OTP Verified Successfully',
                icon: 'success',
                confirmButtonText: 'close'
            })

            const res = await signIn('credentials', {
                token: 'verified',
                email: email,
                password: password,
                redirect: false,
            })
            if (res.error == null && res.status == 200) {
                redirect()
            }
        } else if (status == 201) {

            Swal.fire({
                title: 'Incorrect OTP!',
                text: 'kindly check your mail for the correct OTP',
                icon: 'error',
                confirmButtonText: 'close'
            })
            setLoading(' ')
        } else {
            setNotify('No Authorization')
            Swal.fire({
                title: 'No Authorization!',
                text: 'Invalid Request',
                icon: 'error',
                confirmButtonText: 'close'
            })
        }
    }

    const resendOtp = async () => {
        // var urlencoded = new URLSearchParams();
        // urlencoded.append("email", email);
        // urlencoded.append("password", password);

        // var requestOptions = {
        //     method: 'POST',
        //     body: urlencoded,
        //     redirect: 'follow'
        // };
        // const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/login", requestOptions)
        // const data = await response.json()
        // setLogindata(data);
    }

    return (
        <>
            <div className="loginCont">
                <div className="backgroundCent">

                </div>
                <div className="backgroundCenter">

                </div>
                <div className="container">
                    <div className="center_otp p-5">
                        <div className="row">
                            <div className="col-6">
                                <h3 className="mb-5 fw-bold">CENTER FOR EXCELLENCE PORTAL (SPESSE)</h3>
                                {
                                    notify != " " && (
                                        <p className="text-danger fw-bold">{notify}</p>)
                                }
                                <h1>Enter OTP</h1>

                                <div className="">
                                    <div className="d-flex OtpComponent">
                                        <input maxLength={1} onChange={handleInput} className="" type="text" />
                                        <input maxLength={1} onChange={handleInput} className="" type="text" />
                                        <input maxLength={1} onChange={handleInput} className="" type="text" />
                                        <input maxLength={1} onChange={handleInput} className="" type="text" />
                                        <input maxLength={1} onChange={handleInput} className="" type="text" />
                                    </div>
                                </div>

                                <div className='btn-group mt-3 p-2 '>
                                    <button onClick={verifyOtp} className='btn btn-dark align-items-center justify-content-center d-flex p-2'>
                                        {
                                            loading == 'loading' && (<CircularProgress size='1.5rem' color="inherit" />)
                                        }
                                        verify Otp
                                    </button>
                                    <button onClick={resendOtp} className='btn btn-light p-2'>
                                        Resend Otp
                                    </button>
                                </div>
                            </div>
                            <RightsideCenters />
                        </div>
                    </div>
                </div>
                <div className="container text-center mt-5 pt-5">
                    <p>Copyright © 2022 Sustainable Procurement, Environmenta Social Standards Enhancement (SPESSE)</p>
                </div>



            </div >
        </ >
    );
}
export default Otp;