function Topnav() {
    return (
        <div className=" topnav pt-2 d-flex align-items-center">
            <div className="col-6">
                <p>Dashboard</p>
            </div>
            <div className="d-flex align-items-center justify-content-between col-6">
                <div className="col-5">
                    <input type="text" className="form-control w-100" placeholder="Type here" />
                </div>

                <div>
                    <p>Director</p>
                </div>
                <div>
                    <p>settings icon</p>
                </div>
            </div>
        </div>
    )
}

export default Topnav