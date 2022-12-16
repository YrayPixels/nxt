import Script from 'next/script'
import RightsideCenters from '../../nxt/components/centers/loginComponent/rigthSide';
import { useState } from 'react';
import Head from 'next/head'

function Otp() {
    const [otp, setOtp] = useState('');
    const [response, setResponse] = useState([])

    const verifyOtp = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 1793|4bNnLae9Xz7siyxym8gDapVnOl5DZjAyy0c2ZU5b");

        var formdata = new FormData();
        formdata.append("otp", otp);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/otp", requestOptions)
        const data = await response.json()
        setResponse(data);
    }

    const resendOtp = async () => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/login", requestOptions)
        const data = await response.json()
        setLogindata(data);
    }

    return (
        <>
            <Script src='../public/image/otpscript.js' />
            <div className="loginCont">
                <div className="backgroundCenter">
                </div>
                <div className="container">
                    <div className="center_otp p-5">
                        <div className="row">
                            <div className="col-6">
                                <h3 className="mb-5 fw-bold">CENTER FOR EXCELLENCE PORTAL (SPESSE)</h3>
                                {
                                    response.result == "Invalid OTP" && (
                                        <p className="text-danger fw-bold">Invalid OTP !!!</p>)
                                }
                                <h1>Enter OTP</h1>
                                <input
                                    onChange={(e) => setOtp(e.target.value)} type="text" name="OTP" id="" className='form-control w-50 p-3 fs-1 text-center' maxLength={6} />
                                {/* <div class="otp-field text-dark">
                                    <input type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                    <input class="space" type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                    <input type="text" maxlength="1" />
                                </div> */}
                                <div className='btn-group mt-3 p-2 '>
                                    <button onClick={verifyOtp} className='btn btn-dark p-2'>
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