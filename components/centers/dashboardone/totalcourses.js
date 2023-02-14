import { Book } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import useSWR from 'swr';


function TotalCourse(props) {
    const { det, bearer_key } = props;
    const fetcher = async () => {
        const response = await fetch(`https://stockmgt.gapaautoparts.com/api/center/getTotalCourses/${det.id}`)
        const data = await response.json()
        return data
    }
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