import { useState, useEffect } from "react";

function AddFaculty() {
    const [notify, setNotify] = useState(' ');
    const [deptInfo, setdeptInfo] = useState({
        facultyTitle: " ",
        facultyCode: " ",
    });
    const handleFacultyReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", deptInfo.facultyTitle);
        urlencoded.append("code", deptInfo.facultyCode);
        urlencoded.append("center_id", 1);
        urlencoded.append("Authorization", "Bearer 1864|w9UGxb7vazHXFkv6Z9zs60jfrch48emobrIN6alM")

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        console.log(urlencoded)
        const addFaculty = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/center/AddFaculty", requestOptions)
            const data = await response.json()

            if (data.message == 'Student Added Successfully') {
                setNotify(data.message)
            }
            return data
        }
        addFaculty()
    };

    return (<>
        {
            notify == 'Student Added Successfully' && (
                <p className="text-success text-center fw-bold">Course Added</p>)
        }
        <h3 className="py-4">
            Add Faculty
        </h3>
        <form className="card p-4" action="" onSubmit={handleFacultyReg}>
            <div className="mb-3">
                <label htmlFor="facultyTitle">Faculty Name</label>
                <input onChange={(e) => setdeptInfo(
                    { ...deptInfo, facultyTitle: e.target.value })} type="text" name="facultyTitle" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="facultyCode">Faculty Code</label>
                <input onChange={(e) => setdeptInfo(
                    { ...deptInfo, facultyCode: e.target.value })} type="text" name="facultyCode" className="form-control" />
            </div>
            <div className="col-5 m-auto singleSubmits">
                <button type="submit" className="btn rounded-0  text-info w-100"> Add Faculty</button>
            </div>
        </form>
    </>);
}

export default AddFaculty;