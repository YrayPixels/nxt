import { Search } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

function AllAttendees(props) {
    const { details, bearer } = props
    // const [sessiony, setSessiony] = useState(' ')
    const [loading, setLoading] = useState(false)
    const [session, setSession] = useState([]);
    const [module, setModule] = useState([]);
    const [searchParams, setSearchParams] = useState({
        session_id: " ",
        course_id: " ",
    });


    // console.log(session)
    const fetchData = () => {
        const allSession = `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`
        const allModules = `https://stockmgt.gapaautoparts.com/api/center/GetCourseByCenterId/${details.id}`

        const getallSession = axios.get(allSession);
        const getallModules = axios.get(allModules);

        axios.all([getallSession, getallModules]).then(
            axios.spread((...allData) => {
                const allSessionData = allData[0].data.session;
                const allModuleData = allData[1].data.result;
                setSession(allSessionData)
                setModule(allModuleData)
            })
        )
    }
    fetchData()

    // var config = {
    //     method: 'get',
    //     url: 'https://stockmgt.gapaautoparts.com/api/getAllSession/1634I6495442478',
    //     headers: {
    //         'Authorization': `Bearer ${bearer_key}`,
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    // };

    // // const fetchData = () => {
    // //     axios(config)
    // //         .then(function (response) {
    // //             const data = response.data;
    // //             setSessiony(data.session)
    // //             return data;
    // //         })
    // //         .catch(function (error) {
    // //             console.log(error);
    // //         });
    // // }
    // // fetchData()

    function checkAttendees() {
        var urlencoded = new URLSearchParams();

        var requestOptions = {
            method: 'GET',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://stockmgt.gapaautoparts.com/api/ViewAttendees?course_id=1&session_id=1", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    return (<>


        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>Get Attendees for Individual Modules</p>

            <input type="text" className='col-12 col-md-6 form-control w-50' placeholder='Enter Text Here...' />
        </div>

        <form className="p-4 " action="" onSubmit={checkAttendees}>
            <div className="row input-group">
                <div className="mb-3 col-5">
                    <label htmlFor="node">Session you're starting module on</label>
                    <select name="node" onChange={(e) => setSearchParams(
                        { ...searchParams, session_id: e.target.value })} class="form-select" aria-label="Default select example">
                        <option selected>Select session</option>
                        {
                            session.map(dat => {
                                return (
                                    <option value={dat.id}>{dat.session}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="mb-3 col-5">
                    <label htmlFor="department">Course you are starting module on</label>
                    <select name="department" onChange={(e) => setSearchParams(
                        { ...searchParams, course_id: e.target.value })} class="form-select" aria-label="Default select example">
                        <option selected>Select Course</option>
                        {
                            module.map(dat => {
                                return (
                                    <option value={dat.id}>{dat.title}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-2 m-auto singleSubmits">
                    <button type="submit" className="btn rounded-0  text-info w-100"> <Search /></button>
                </div>
            </div>
        </form>



        <div className="bg-info p-4 shadow rounded-0 table-responsive">
            <table className="tableData table table-striped table-sm table-hover  ">
                <thead>
                    <tr>
                        <th>STUDENT'S NAME</th>
                        <th>EMAIl</th>
                        <th>PHONE</th>
                        <th>DEPARTMENT</th>
                        <th>PROGRAMME</th>
                        <th>FACULTY</th>
                        <th>OCCUPATION</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                {/* <tbody>
                    {
                        data.map(student => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.departments_title} </td>
                                    <td>{student.programmes_title}</td>
                                    <td>{student.faculties_title}</td>
                                    <td>{student.occupation}</td>
                                    <td>
                                        <Link href={`/centers/studentlist/${student.id}`} >
                                            <button className='btn btn-primary'>View</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody> */}
            </table>
        </div>
    </>);
}

export default AllAttendees;