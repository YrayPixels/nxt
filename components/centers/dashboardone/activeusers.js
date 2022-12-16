import useSWR from 'swr';
const fetcher = async () => {
    const response = await fetch('https://stockmgt.gapaautoparts.com/api/center/getTotalUsers')
    const data = await response.json()
    return data
}

function TotalactiveUsers() {
    const { data, error } = useSWR('totalUsers', fetcher)

    if (error)
        return 'An error has occured'
    if (!data) return 'loading..'

    return (
        <div className="d-flex topPills">
            <div className="col-10">
                <p>Active Users</p>
                <p className="fw-bold num">{data.result}</p>
            </div>
            <div className="col-2">
                <img src="" alt="" />
            </div>
        </div>
    );
}
export default TotalactiveUsers;