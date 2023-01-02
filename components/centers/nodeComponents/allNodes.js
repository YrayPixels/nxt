import axios from "axios";
import { useEffect, useState } from "react";

function AllNodes(props) {
    const { details, bearer } = props
    const [nodes, setNodes] = useState(' ')

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
                console.log(data)
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    fetchData()
    // useEffect(() => {
    //     fetchData()
    // }, [])

    console.log(nodes)

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
                <tbody>
                    {nodes.length <= 0 ? <p className='text-center'>No Nodes Yet Kindly add nodes from the menu on your left</p> : <p>omo this thing no want work o</p>
                        // nodes.map(student => {
                        //     return (
                        //         <tr className='align-items-center '>
                        //             <td><span><img src="" alt="" /></span> {student.name}</td>
                        //             <td>{student.email}</td>
                        //             <td>{student.phone}</td>
                        //             <td>{student.departments_title} </td>
                        //             <td>{student.programmes_title}</td>
                        //             <td>{student.faculties_title}</td>
                        //             <td>{student.occupation}</td>
                        //             <td>
                        //                 <Link href={`/centers/studentlist/${student.id}`} >
                        //                     <button className='btn btn-primary'>View</button>
                        //                 </Link>
                        //             </td>
                        //         </tr>
                        //     )
                        // })
                    }

                </tbody>
            </table>
        </div>
    </>);
}

export default AllNodes;