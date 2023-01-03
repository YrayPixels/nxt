import { Check } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from 'swr';


function AllSession(props) {
    const { details, bearer } = props;

    const [sessiony, setSessiony] = useState(' ')

    const [loading, setLoading] = useState(false)

    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/getAllSession/${details.id}`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setSessiony(data.session)
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // useEffect(() => {
    //     fetchData()
    // }, [])

    fetchData()

    // SetSession Current
    function setSessionCont(param) {
        setLoading(true)
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        const fetcher = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/SetSessionCurrent/${param}`, requestOptions)
            const data = await response.json()
            setLoading(false)
            return data;


        }
        fetcher()
    }
    function hideSession(param) {
        console.log(param)
        // console.log(bearer_key)
        setLoading(true)
        var urlencoded = new URLSearchParams();
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        const fetcher = async () => {
            const response = await fetch(`https://stockmgt.gapaautoparts.com/api/HideSession/${param}`, requestOptions)
            const data = await response.json()
            setLoading(false)
            return data;


        }
        fetcher()
    }
    return (<>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>Registered Sessions</p>
            <input type="text" className='col-12 col-md-6 form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0 table-responsive">
            <table className="tableData table table-striped table-sm table-hover  ">
                <thead>
                    <tr>
                        <th>SESSION</th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {sessiony == ' ' ?

                        <p> <CircularProgress /></p>
                        :
                        sessiony.map(session => {
                            return (
                                <tr className='align-items-center '>
                                    <td>{session.session}</td>
                                    <td>{session.session_start}</td>
                                    <td>{session.session_end} </td>
                                    <td>
                                        {session.current == 0 ?
                                            <button onClick={() => setSessionCont(`${session.id}`)} className='btn btn-sm btn-success d-flex align-items-center'>
                                                {
                                                    loading ? <span><CircularProgress size='1rem' color="inherit" /></span> :
                                                        <span></span>
                                                }make current</button> :

                                            <p className="text-success">Current Session</p>

                                        }

                                    </td>
                                    <td>
                                        <Link href={`/centers/session/edit/${session.id}`}>
                                            <button className="btn btn-primary btn-sm">
                                                Edit Session
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() =>
                                            hideSession(`${session.id}`)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    </>);
}

export default AllSession;