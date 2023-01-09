import Image from "next/image";

function RightsideCenters(props) {
    const { spesee, nuclogo, worldBank } = props

    return (<>
        <div className="row justify-content-between align-items-center pb-3">
            <div className="col-3 col-lg-6">
                <Image width={200} src={worldBank} className="img-fluid" alt="World Bank Logo" />
            </div>
            <div className="col-3 col-lg-6">
                <Image width={200} src={nuclogo} className="img-fluid" alt="NUC logo" />

            </div>
            <div className="col-3 d-lg-none">
                <Image width={200} src={spesee} className="img-fluid" alt="SPESSE logo" />
            </div>
        </div>
        <div className="d-none d-lg-block text-center">
            <Image width={200} src={spesee} className="img-fluid" alt="SPESSE logo" />

        </div>
    </>);
}
export default RightsideCenters;