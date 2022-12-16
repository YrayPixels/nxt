import Image from "next/image";
import { useState } from "react";
import useSWR from 'swr';


function LoginComponent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    var resultData = [];

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
        resultData.push(data);
        alert(resultData);
        // return response.json()
    }

    // if (resultData.length == 0) {
    //     alert(resultData);
    // }
    // else if (resultData[0].message) {
    // (resultData[0].message);

    // }


    return (
        <div className="loginCont">
            <div className="backgroundCenter">

            </div>
            <div className="container">

                <div className="center_login p-5">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="mb-5 fw-bold">CENTER FOR EXCELLENCE PORTAL (SPESSE)</h3>

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

                        </div>
                        <div className="col-6">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <img className="world img-fluid" src="image/worldBank.png" alt="" />
                                </div>
                                <div>
                                    <img className="img-fluid" src="image/nuclogo.png" alt="" />
                                </div>
                            </div>
                            <div className="text-center">
                                <img className="img-fluid" src="image/spesee.png" alt="" />
                            </div>
                        </div>
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