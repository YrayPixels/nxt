import RightsideCenters from "/components/centers/loginComponent/rigthSide";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';


function LoginComponent() {
    const router = useRouter();
    const [notify, setNotify] = useState(' ');
    const [userInfo, setUserInfo] = useState({ email: " ", password: " " });

    function redirect() {
        router.replace('/centers/dashboard');
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false
        })
        if (res.error == null && res.status == 200) {
            redirect()
        } else {
            setNotify(res.error);
        }
    };
    return (

        <div className="loginCont">
            <div className="backgroundCent">

            </div>
            <div className="backgroundCenter">

            </div>
            <div className="container">

                <div className="center_login p-5">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="mb-5 fw-bold">CENTER FOR EXCELLENCE PORTAL (SPESSE)</h3>
                            {
                                notify == 'Invalid credentials' && (
                                    <p className="text-danger fw-bold">Incorrect Credentials !!!</p>)
                            }
                            <h2>Sign In</h2>
                            <p>Enter the email and password provided to log in.</p>
                            <form action="" onSubmit={handleSubmit}>
                                <div className="mb-4 ">
                                    <label for="email">Email</label>
                                    <input type="email" name="email"
                                        onChange={(e) => setUserInfo(
                                            { ...userInfo, email: e.target.value })}
                                        // value={userInfo.email}
                                        placeholder='enter your email address'
                                        className="form-control w-50 rounded-0" id="" />
                                </div>
                                <div className="mb-4 ">
                                    <label for="password">Password</label>
                                    <input type="password" name="password"
                                        onChange={(e) => setUserInfo(
                                            { ...userInfo, password: e.target.value })}
                                        // value={userInfo.password}
                                        className="form-control w-50 rounded-0 " id="" />
                                </div>
                                <div className="form-check mb-4 form-switch">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                    <label for=""> Remember Me</label>

                                </div>
                                <div className="mb-4 ">
                                    <button className="w-50 btn rounded-0"
                                        type="submit" name="" id="">Login</button>
                                </div>


                            </form>
                        </div>
                        <RightsideCenters />
                    </div>
                </div>
            </div>
            <div className="container text-center mt-5 pt-5">
                <p>Copyright © 2022 Sustainable Procurement, Environmenta Social Standards Enhancement (SPESSE)</p>
            </div>

        </div >

    );
}
export default LoginComponent;