import { LocationCityOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import useSWR from 'swr';
const fetcher = async () => {
    const response = await fetch('https://stockmgt.gapaautoparts.com/api/center/getTotalUsers')
    const data = await response.json()
    return data
}
function Totalfaculty() {
    const { data, error } = useSWR('totalFaculty', fetcher)

    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
    return (
        <div className="row topPills  align-items-center">
            <div className="col-12 col-md-8">
                <p>Total No of Faculty</p>
                <p className="fw-bold num">{data.result}</p>
            </div>
            <div className="col-12 col-md-4 text-center ">
                <span className='text-center shadow-sm '><LocationCityOutlined /></span>

            </div>
        </div>
    );
}
export default Totalfaculty;