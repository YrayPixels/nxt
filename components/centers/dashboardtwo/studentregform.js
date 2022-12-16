function StudentRegistration() {
    return (<>
        <h3>
            Student Registration Information
        </h3>
        <form action="">

            <div>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    Upload Image
                    <button>Browse</button>
                </div>
            </div>

            <div>
                <label htmlFor="fullname">Trainee Name</label>
                <input type="text" name="fullname" className="form-control" />
            </div>
        </form>
    </>);
}

export default StudentRegistration;