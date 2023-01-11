import { Delete, Edit, Email, Phone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Link from "next/link";

function ProfileDetails(props) {
    const { details, bearer } = props
    return (<>
        <div className="col-12">
            <div className="bg-info p-5 shadow">

                <div className="d-flex justify-content-around align-items-center">
                    <div>
                        <Avatar
                            alt={details.center_name}
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 100, height: 100 }}
                        />
                    </div>
                    <div>
                        <h2 className="">
                            {details.center_name}
                        </h2>
                        <p>Center Code: {details.center_code}</p>
                        <p>Center Id: {details.id}</p>

                        <p><Email
                        /> {details.email}</p>
                        <p><Phone /> {details.phone_number}</p>

                        <div className="mb-2">
                            <Link href={`/centers/studentlist/edit/${details.id}`}>
                                <button className="btn btn-sm btn-primary">
                                    <Edit /> Edit Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div className="col">
                        <h6>Gender</h6>
                        <p>{details.sex}</p>
                    </div>
                    <div className="col">
                        <h6>Age</h6>
                        <p>{details.age}</p>
                    </div>
                    <div className="col">
                        <h6>Address</h6>
                        <p>{details.address}</p>
                    </div>

                </div>
            </div>

        </div></>);
}

export default ProfileDetails;