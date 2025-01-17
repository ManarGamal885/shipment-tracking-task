import './index.css';
import Shipment from "./types/Shipment";
import HomePage from "./pages/HomePage.tsx";

const shipmentInstance: Shipment = {
    provider: "Bosta",
    CurrentStatus: {
        code: 41,
        state: "Out for delivery",
        timestamp: "2024-09-18T08:29:48.654Z"
    },
    PromisedDate: "2024-09-12T00:00:00.000Z",
    TrackingNumber: "69171493",
    TransitEvents: [
        {
            state: "Your order is created, Bosta will pick it up once your shipper is ready",
            timestamp: "2024-09-11T12:18:20.913Z",
            code: 10
        },
        {
            state: "Order is received at Bosta warehouses and being processed.",
            timestamp: "2024-09-11T12:19:54.308Z",
            code: 24
        },
        {
            state: "Order is out for delivery",
            timestamp: "2024-09-11T12:33:39.086Z",
            code: 41,
            msg: "Will be Deliverd from 10 AM to 6 PM According to the Courier Route"
        },
        {
            state: "Exception 16",
            timestamp: "2024-09-11T12:33:58.926Z",
            code: 47
        },
        {
            state: "Order is received at Bosta warehouses and being processed.",
            timestamp: "2024-09-11T12:34:11.574Z",
            code: 24
        },
        {
            state: "Order is out for delivery",
            timestamp: "2024-09-18T08:14:00.206Z",
            code: 41,
            msg: "Will be Deliverd from 10 AM to 6 PM According to the Courier Route"
        },
        {
            state: "Order is out for delivery",
            timestamp: "2024-09-18T08:29:48.654Z",
            code: 41,
            msg: "Will be Deliverd from 10 AM to 6 PM According to the Courier Route"
        }
    ],
    CreateDate: "2024-09-11T12:18:20.962Z",
    isEditableShipment: false,
    nextWorkingDay: [
        {
            dayDate: "2024-09-14",
            dayName: "Saturday"
        }
    ],
    isOnlinePaymentFeatureEnabled: true
};

function App() {

    return (
        <>
            <HomePage />
        </>
    );
}

export default App;