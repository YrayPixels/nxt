import { LocationCityOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

function Totalfaculty(props) {
    const { det, bearer_key } = props;
    const [data, setData] = useState([]);
    const fetcher = async () => {
        const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/getTotalFaculty/${det.id}`)
        const data = await response.json()
        setData(data);
    }
    useEffect(() => {
        if (data.length == 0) {
            fetcher();
        }
    })
    // const { data, error } = useSWR('totalFaculty', fetcher)
    return (
        <div className="row topPills shadow  align-items-center">
            <div className="col-12 text-center col-md-8">
                <p>Total Faculty</p>
                <p className="fw-bold num">{
                    data.length == 0 ? '---' :

                        !data ? '---' : data.result}</p>
            </div>
            <div className="col-12 col-md-4 text-center ">
                <span className='text-center shadow-sm '><LocationCityOutlined /></span>

            </div>
        </div>
    );
}
export default Totalfaculty;