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

    return (
        <div className="row topPills shadow  align-items-center">
            <div className="col-12 text-center col-md-8">
                <p>Total Courses</p>
                <p className="fw-bold num">{
                    error ? '---' :

                        !data ? '---' : data.result}</p>
            </div>
            <div className="col-12 col-md-4 text-center ">
                <span className='text-center shadow-sm '><Book /></span>

            </div>
        </div>
    );

}
export default TotalCourse;