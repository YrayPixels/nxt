function Recentregisterd() {
    return (<div>
        <div className="bg-info p-4 shadow rounded-3">
            <div>
                <h6 className="fw-bold">Recent Registered  Students</h6>
                <p>Done this month</p>
            </div>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th>STUDENT'S NAME</th>
                        <th>COURSE TITLE</th>
                        <th>FACULTY</th>
                        <th>DELIVERY DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span><img src="" alt="" /></span> Micheal Adesuwa</td>
                        <td>Forest Resources Management</td>
                        <td>Agricultural Science</td>
                        <td>29-10-22</td>
                        <td>Pending</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>);
}

export default Recentregisterd;