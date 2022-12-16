function StudentDetails() {
    return (<>
        <h3 className="py-4">
            Student Registration Information
        </h3>
        <form className="card p-4" action="">

            <div className="row col-6 align-items-center">
                <div className="profileImg col-5">
                    <img src="" alt="" />
                </div>
                <div className="col-5">
                    Upload Image
                    <button>Browse</button>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="fullname">Trainee Name</label>
                <input type="text" name="fullname" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone">Telephone number</label>
                <input type="text" name="phone" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="nationality">Nationality</label>
                <input type="text" name="nationality" className="form-control" />
            </div>
            <div className="mb-3 input-group ">
                {/* <label htmlFor="nationality">Nationality</label> */}
                <input type="text" name="nationality" className="form-control" />

                {/* <label htmlFor="age">Age</label> */}
                <input type="text" name="age" className="form-control" />
            </div>
            <div className="mb-3 input-group ">
                {/* <label htmlFor="academic">Academic Background</label> */}
                <input type="text" name="academic" className="form-control" />

                {/* <label htmlFor="academic">Academic Background</label> */}
                <input type="text" name="academic" className="form-control" />
            </div>
            <div className="mb-3 input-group ">
                {/* <label htmlFor="employementStatus">Employement Status</label> */}
                <input type="text" name="employementStatus" className="form-control" />

                {/* <label htmlFor="ifemployed">If Employed</label> */}
                <input type="text" name="ifemployed" className="form-control" />
            </div>
            <div>
                <button className="btn btn-dark rounded-0 m-auto"> Submit</button>
            </div>
        </form>
    </>);
}

export default StudentDetails;