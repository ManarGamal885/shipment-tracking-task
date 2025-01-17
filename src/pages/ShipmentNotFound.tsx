import NotFoundIcon from "../assets/icons/order-notdound.png"; // Replace with your "not found" image

const ShipmentNotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <img
                    src={NotFoundIcon}
                    alt="Shipment Not Found"
                    className="not-found-icon"
                />
                <h1 className="not-found-title">Oops! Shipment Not Found</h1>
                <p className="not-found-message">
                    We couldn't find a shipment with the provided tracking number.
                    Please double-check the number and try again.
                </p>
            </div>
        </div>
    );
};

export default ShipmentNotFound;

