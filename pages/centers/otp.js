import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import RightsideCenters from '../../components/centers/loginComponent/rigthSide';

import speseeLogo from '../../public/image/spesee.png'
import worldbank from '../../public/image/worldBank.png'
import nuc from '../../public/image/nuclogo.png'
import FooterComp from '../../components/footer';


function Otp() {
    const router = useRouter();
    const { status, data } = useSession();
    const [bearer_key, setBearer_key] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [dets, setDets] = useState([]);
    const [state, setState] = useState({ otp: "" });
    // const [otpstate, setotpState] = useState([])
    const [notify, setNotify] = useState(' ')
    const [loading, setLoading] = useState(' ');
    const [userDetails, setUserDetails] = useState({
        id: " ",
        center_name: " ",
        center_code: " ",
        email: " ",
        phone_number: "",
        logo: ' ',
        state_id: ' ',
        lga_id: ' ',
        center_otp: " ",
        type: " ",
        added_at: " ",
        address: "",
        status: " ",
        bearer_toke: "",
    })
    // console.log(useSession())
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
            setDets(window.sessionStorage.getItem('dets'));
            // setEmail(window.sessionStorage.getItem('user_email'));
        }
    }, []);
    // console.log(JSON.parse(dets))
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

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearer_key}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("otp", otp);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            // redirect: 'follow'
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
                timer: 1000,
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
                timer: 1000,
            })
            setLoading(' ')
        } else {
            setNotify('No Authorization')
            Swal.fire({
                title: 'No Authorization!',
                text: 'Invalid Request',
                icon: 'error',
                timer: 1000,
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
            <div className="conttt">

                <div className="loginCont container py-sm-0">

                    <div className="container py-sm-0">

                        <div className="center_login p-2 p-lg-5">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-6 order-1 order-lg-0">
                                    <h3 className="mb-5 fw-bold">CENTER FOR EXCELLENCE PORTAL (SPESSE)</h3>
                                    {
                                        notify != " " && (
                                            <p className="text-danger fw-bold">{notify}</p>)
                                    }
                                    <h5 className='fw-bold'>ENTER OTP</h5>

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
                                <div className="col-12 col-lg-6 order-0 order-lg-2 my-sm-0 py-sm-0 my-lg-5 py-lg-5">
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
        </ >
    );
}
export default Otp;