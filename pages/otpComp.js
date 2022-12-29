import { useState } from "react";

function OtpComp() {
    const [filled, setFilled] = useState([])
    let inputArray = []
    function handleInput(e) {
        let inputVal = e.target.value;
        // console.log(e)
        if (inputVal != []) {
            if (e.target.nextSibling != null) {
                e.target.nextSibling.focus()
                inputArray.push(inputVal)
                setFilled(filled.concat(inputVal))
                console.log(filled)
            } else {
                inputArray.push(inputVal)
                setFilled(filled.concat(inputVal))
            }
            // console.log(inputArray)/
        } else {
            if (e.target.previousSibling != null) {
                e.target.previousSibling.focus()
            } else {
                setFilled([])
            }
        }
    }

    return (<>
        <div className="OtpComponent">
            <div className="d-flex">
                <input onChange={handleInput} className="" type="text" maxLength={1} />
                <input onChange={handleInput} className="" type="text" maxLength={1} />
                <input onChange={handleInput} className="" type="text" maxLength={1} />
                <input onChange={handleInput} className="" type="text" maxLength={1} />
                <input onChange={handleInput} className="" type="text" maxLength={1} />
            </div>
        </div>
    </>);
}

export default OtpComp;