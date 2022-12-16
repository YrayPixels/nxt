import useSWR from 'swr';

const fetcher = async () => {
    const response = await fetch('https://stockmgt.gapaautoparts.com/api/center/getTotalFemaleStudents')
    const data = await response.json()
    return data
}

function Totalfemale() {
    const { data, error } = useSWR('totalFemales', fetcher)

    if (error)
        return 'An error has occured'
    if (!data) return 'loading..'
    return (
        <div className="d-flex topPills">
            <div className="col-10">
                <p>Total Female</p>
                <p className="fw-bold num">{data.students}</p>
            </div>
            <div className="col-2">
                <img src="" alt="" />
            </div>
        </div>
    );
}
export default Totalfemale;