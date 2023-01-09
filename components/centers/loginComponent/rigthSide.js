import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import Image from "next/image";

function RightsideCenters(props) {
    const { spesee, nuclogo, worldBank } = props

    return (<>
        <div className="row justify-content-between align-items-center py-3">
            <CCarousel className="text-center" interval={1000}>
                <CCarouselItem>
                    <Image width={200} src={worldBank} className="" alt="World Bank Logo" />

                </CCarouselItem>
                <CCarouselItem>
                    <Image width={200} src={nuclogo} className="" alt="NUC logo" />

                </CCarouselItem>
                <CCarouselItem>
                    <Image width={200} src={spesee} className="" alt="SPESSE logo" />

                </CCarouselItem>
            </CCarousel>
        </div>
        {/* <div className="row justify-content-between align-items-center pb-3">
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

        </div> */}
    </>);
}
export default RightsideCenters;