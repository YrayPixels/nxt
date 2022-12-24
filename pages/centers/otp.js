import Script from 'next/script'
import RightsideCenters from "/components/centers/loginComponent/rigthSide";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head'
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';
import OtpInput from 'react-otp-input';
// const bearer_key = sessionStorage.getItem("bearer_token");

function Otp() {
    const router = useRouter();
    const [state, setState] = useState({ otp: "" });
    // const [otpstate, setotpState] = useState([])
    const [notify, setNotify] = useState(' ')
    const [loading, setLoading] = useState(' ');

    // setState();

    const handleChange = otp => setState({ otp });



    function redirect() {
        router.replace('/centers/dashboard');
    }
    // console.log(bearer_key)

    const verifyOtp = async () => {
        // console.log(state.otp)

        setNotify(' ')

        var myHeaders = new Headers();
        myHeaders.append("Authorization",
            `Bearer 1975|nF4VjC4BUvdKN6pUI0BO5rbS4qz3kHIbC9HkvpNP`)

        var formdata = new FormData();
        formdata.append("otp", state.otp);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
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
            // console.log(data);
        } else {
            setNotify('No Authotrization')
            Swal.fire({
                title: 'No Authotrization!',
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

                                <OtpInput
                                    value={state.otp}
                                    onChange={handleChange}
                                    numInputs={5}
                                    separator={<span>-</span>}
                                    inputStyle='otpInputStyle'
                                    isInputNum='true'
                                    placeholder='*****'
                                />
                                {/* <input
                                    onChange={ } type="text" name="OTP" id="" className='form-control w-50 p-3 fs-1 text-center' maxLength={6} /> */}
                                {/* <div class="otp-field text-dark">
                                    <input type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                    <input class="space" type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                </div> */}
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