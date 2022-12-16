import { useState } from "react"
import React from 'react'

function LoginCenters() {

    const [loginData, setLogindata] = useState([])

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

    return (
        <div> </div>
    )
}

export default LoginCenters