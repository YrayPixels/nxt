import { Female } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import useSWR from 'swr';

const fetcher = async () => {
    const response = await fetch('https://stockmgt.gapaautoparts.com/api/center/getTotalFemaleStudents')
    const data = await response.json()
    return data
}

function Totalfemale() {
    const { data, error } = useSWR('totalFemales', fetcher)

    if (error)
        return <CircularProgress />
    if (!data) return <CircularProgress />
    return (
        <div className="row align-items-center shadow text-center text-md-start topPills">
            <div className="col-12 col-md-8">
                <p>Total Female</p>
                <p className="fw-bold num">{data.students}</p>
            </div>
            <div className="col-12 col-md-4 text-center ">
                <span className='text-center shadow-sm '><Female /></span>

            </div>
        </div>
    );
}
export default Totalfemale;
