import { useEffect, useState } from 'react';
import {formatDate} from "../../utils/formateDate.ts";
import Shipment from "../../types/Shipment.ts";
interface ShipmentDetailsProps {
    shipment: Shipment;
}


const ShipmentDetails = ({ shipment }: ShipmentDetailsProps) => {
    const statuses = ["Received at warehouse", "Processing", "Out for delivery", "Delivered"];
    const [currentStatus, setCurrentStatus] = useState("");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    useEffect(() => {
        setCurrentStatus(shipment.CurrentStatus.state);
        const completed: string[] = [];
        let i = 0;
        while (i < statuses.length && statuses[i] !== shipment.CurrentStatus.state) {
            completed.push(statuses[i]);
            i++;
        }
        completed.push(statuses[i]);
        setCompletedSteps(completed);
    }, [shipment]);

    return (
        <div className="shipment-details-container">
            {/* Shipment Information Section */}
            <div className="shipment-information">
                <span className="order-number">
                    ORDER #{shipment.TrackingNumber}
                </span>
                <div className="arrival-info">
                    <span className="arrival-label">Arriving by</span>
                    <span className="arrival-date">
                        {formatDate(shipment.PromisedDate)}
                    </span>
                </div>
                <p className="delivery-note">
                    Your order is expected to arrive within 2 - 3 working days.
                </p>
            </div>

            {/* Tracking Process Section */}
            <div className="shipment-tracking-process">
                <div className="tracking-steps">
                    {/* Progress Line */}
                    <div className="progress-line">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${((completedSteps.length - 1) / (statuses.length - 1)) * 100}%`,
                                height: `${((completedSteps.length - 1) / (statuses.length - 1)) * 100}%`
                            }}
                        ></div>
                    </div>

                    {/* Steps */}
                    {statuses.map((step, index) => (
                        <div
                            key={index}
                            className={`step ${completedSteps.includes(step) ? 'completed' : ''}`}
                        >
                            <div className="step-dot">
                                {completedSteps.includes(step) && (
                                    <svg className="check-mark" viewBox="0 0 24 24" width="12" height="12">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                )}
                            </div>
                            <div className="step-label">
                                <div>{step}</div>
                                {index === 0 && (
                                    <div className="step-date">
                                        {formatDate(shipment.CurrentStatus.timestamp)}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShipmentDetails;
