import { useEffect, useState } from "react";
import BostaIcon from "../assets/icons/bosta-en.png";
import ShipmentSearch from "../components/ShipmentSearch/ShipmentSearch.tsx";
import ShipmentDetails from "../components/ShipmentDetails/ShipmentDetails.tsx";
import DeliveryTimelineExpanded from "../components/DeliveryTimeline/DeliveryTimelineExpanded.tsx";
import Shipment from "../types/Shipment.ts";
import LocationIcon from "../components/common/icons/LocationIcon.tsx";
import ShipmentNotFound from "./ShipmentNotFound.tsx";

const HomePage = () => {
    const [selectedOption, setSelectedOption] = useState("English");
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [error, setError] = useState("");
    const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

    const handleSelectChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleShipmentFound = (data: Shipment) => {
        setShipment(data);
        setError("");
    };

    const handleError = (status: number) => {
        setShipment(null);
        setError(
            status === 404
                ? "Tracking number not found"
                : "Error occurred while fetching shipment details"
        );
    };

    const toggleTimeline = () => {
        setIsTimelineExpanded(!isTimelineExpanded);
    };

    useEffect(() => {
        if (shipment) {
            console.log("Shipment Found:", shipment.TrackingNumber);
        }
    }, [shipment]);

    return (
        <div className="home-container">
            <div className="upper-container"></div>
            <div className="main-content-wrapper">
                <div className="content-container">
                    <div className="header-container">
                        <a>
                            <img className="bosta-icon" src={BostaIcon} alt="Logo"/>
                        </a>
                    </div>
                    <LocationIcon />
                    <h1 className="title">Track your shipment</h1>
                    <div className={`shipment-search`}>
                        <ShipmentSearch
                            onShipmentFound={handleShipmentFound}
                            onError={handleError}
                        />
                    </div>

                    {shipment? (
                        <div className="shipment-content-container">
                            <ShipmentDetails shipment={shipment}/>
                            <div className="timeline-wrapper">
                                <DeliveryTimelineExpanded shipment={shipment}/>
                            </div>
                        </div>
                    ):
                        (
                            <ShipmentNotFound />
                        )}
                </div>
            </div>
            <div className="lower-container"></div>
        </div>
    );
};

export default HomePage;