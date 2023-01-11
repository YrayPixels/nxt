import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AddPartnersComp(props) {
    const router = useRouter()
    const { details, bearer } = props;
    const [notify, setNotify] = useState(' ');
    const [bearer_key, setBearer_key] = useState(' ');
    const [partnerInfo, setpartnerInfo] = useState({
        name: " ",
        type: " ",
    });
    useEffect(() => {
        if (window) {
            setBearer_key(window.sessionStorage.getItem("bearer_token"));
        }
    }, []);
    // console.log(details.id)
    const handlePartnersReg = async (e) => {
        e.preventDefault()

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", partnerInfo.name);
        urlencoded.append("code", partnerInfo.type);
        urlencoded.append("center_id", details.id);
        urlencoded.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };
        setNotify('loading')

        const addPartners = async () => {
            const response = await fetch("https://stockmgt.gapaautoparts.com/api/addAcademicPartners", requestOptions)
            const data = await response.json()
            const status = response.status;
            if (status == 200) {
                setNotify('Partner Added Succesfully')
                Swal.fire({
                    title: 'Partner Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                router.push('/centers/faculties')

            } else if (status == 201) {
                setNotify('Partner already Added ')
                Swal.fire({
                    title: 'Partner already Added ',
                    icon: 'success',
                    confirmButtonText: 'close'
                })
                router.push('/centers/faculties')

            } else {
                setNotify('Error Occured!!!')
                Swal.fire({
                    title: 'An Error Occured',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
            }
        }
        addPartners()
    };

    return (
        <>
            {
                notify == 'loading' && (
                    <p className="text-success text-center fw-bold"><CircularProgress /></p>
                )
            }
            {
                notify != ' ' && (
                    <p className="text-success text-center fw-bold">{notify}</p>)
            }
            <h3 className="py-4">
                Add Partners
            </h3>
            <form className="card p-4" action="" onSubmit={handlePartnersReg}>
                <div className="mb-3">
                    <label htmlFor="name">Partner Name</label>
                    <input onChange={(e) => setpartnerInfo(
                        { ...partnerInfo, name: e.target.value })} type="text" name="name" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="type">Partner Type</label>
                    <input onChange={(e) => setpartnerInfo(
                        { ...partnerInfo, type: e.target.value })} type="text" name="type" className="form-control" />
                </div>
                <div className="col-5 m-auto singleSubmits">
                    <button type="submit" className="btn rounded-0  text-info w-100"> Add Partners</button>
                </div>
            </form>
        </>
    );
}

export default AddPartnersComp;