import LoginCenters from "../nxt/components/centers/loginComponent/loginCenters";
import RightsideCenters from "../nxt/components/centers/loginComponent/rigthSide";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


function LoginComponent() {

    const router = useRouter();

    function redirect() {
        router.replace('/centers/dashboard');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginData, setLogindata] = useState([])

    const tester = "incorrect credentials"

    const login = async () => {
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
    const hasKeys = !!Object.keys(loginData).length;

    if ((hasKeys)) {

        redirect()
    }
    console.log(loginData);
    return (

        <div className="loginCont">

            <div className="backgroundCenter">

            </div>
            <div className="container">

                <div className="center_login p-5">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="mb-5 fw-bold">CENTER FOR EXCELLENCE PORTAL (SPESSE)</h3>
                            {
                                loginData.message == tester && (
                                    <p className="text-danger fw-bold">Incorrect Credentials !!!</p>)
                            }
                            <h2>Sign In</h2>
                            <p>Enter the email and password provided to log in.</p>
                            <div className="mb-4 ">
                                <label for="email">Email</label>
                                <input type="email" name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control w-50 rounded-0" id="" />
                            </div>
                            <div className="mb-4 ">
                                <label for="password">Password</label>
                                <input type="password" name="password"
                                    onChange={(e) => setPassword(e.target.value)} className="form-control w-50 rounded-0 " id="" />
                            </div>
                            <div className="form-check mb-4 form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                                <label for=""> Remember Me</label>

                            </div>
                            <div className="mb-4 ">

                                <button className="w-50 btn rounded-0"
                                    onClick={login}
                                    type="submit" name="" id="">Login</button>
                            </div>

                            <div>
                                <button onClick={() => router.push("/centers/dashboard")} >Dashboard Link</button>
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

    );
}
export default LoginComponent;