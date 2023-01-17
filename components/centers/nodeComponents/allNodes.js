import { CircularProgress, Link } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function AllNodes(props) {
    const { details, bearer } = props
    const [nodes, setNodes] = useState(' ')

    const [loading, setLoading] = useState(false)


    var config = {
        method: 'get',
        url: `https://stockmgt.gapaautoparts.com/api/getNodes/${details.id}`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const fetchData = () => {
        axios(config)
            .then(function (response) {
                const data = response.data;
                setNodes(data.Nodes)
                return data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        if (nodes.length == 0 || nodes == ' ') {
            fetchData()

        }
    })

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
                        <th>CODE</th>
                        <th>HOURS</th>
                        <th>MODE OF DELIVERY</th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>ANOUNCEMENT DATE</th>

                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {nodes == ' ' ? <p className='text-center'><CircularProgress /></p> :
                        nodes.map(node => {
                            return (
                                <tr className='align-items-center '>
                                    <td><span><img src="" alt="" /></span> {node.node_id}</td>
                                    <td>{node.node}</td>
                                    <td>{node.programme_id}</td>
                                    <td>{node.date_announced} </td>
                                    <td>{node.programmes_title}</td>
                                    <td>{node.faculties_title}</td>
                                    <td>{node.occupation}</td>
                                    <td>

                                        <Link href={`/centers/studentlist/${node.node_id}`} >
                                            <button className='btn btn-primary'>View</button>
                                        </Link>
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

export default AllNodes;