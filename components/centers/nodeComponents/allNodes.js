import axios from "axios";
import { useEffect, useState } from "react";

function AllNodes() {
    const [bearer_key, setBearer_key] = useState(' ');
    const [sessiony, setSessiony] = useState(' ')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);

    var config = {
        method: 'get',
        url: 'https://stockmgt.gapaautoparts.com/api/getAllSession/1634I6495442478',
        headers: {
            'Authorization': `Bearer ${bearer_key}`,
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
    fetchData()


    return (<>
        <div className='d-flex align-items-center justify-content-between py-4'>
            <p>All Nodes</p>
            {/* <Input fullWidth
                classes={
                    'form-control'
                }
                placeholder="Enter text here..." /> */}
            <input type="text" className='col-12 col-md-6 form-control w-50' placeholder='Enter Text Here...' />
        </div>
        <div className="bg-info p-4 shadow rounded-0 table-responsive">
            <table className="tableData table table-striped table-sm table-hover  ">
                <thead>
                    <tr>
                        <th>NODE</th>
                        <th>PROGRAMME</th>
                        <th>CENTER</th>
                        <th>ANNOUNCEMENT DATE</th>
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

export default AllNodes;