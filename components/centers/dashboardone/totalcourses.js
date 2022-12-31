import { Book } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import useSWR from 'swr';
const fetcher = async () => {
    const response = await fetch('https://stockmgt.gapaautoparts.com/api/center/getTotalCourses')
    const data = await response.json()
    return data
}

function TotalCourse() {
    const { data, error } = useSWR('totalCourses', fetcher)

    if (error)
        return 'An error has occured'
    if (!data) return <CircularProgress />
    return (
        <div className="row align-items-center shadow topPills">
            <div className="col-12 col-md-8">
                <p>Total No of Courses</p>
                <p className="fw-bold num">{data.result}</p>
            </div>
            <div className="col-12 col-md-4 text-center ">
                <span className='text-center shadow-sm '><Book /></span>

            </div>
        </div>
    );
}
export default TotalCourse;