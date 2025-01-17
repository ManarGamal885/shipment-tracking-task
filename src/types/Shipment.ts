interface DropOffAddress {
    city: {
        name: string;
        nameAr: string;
        sector: number;
        _id: string;
    };
    country: {
        code: string;
        name: string;
        nameAr: string;
        _id: string;
    };
    district: {
        name: string;
        nameAr: string;
        _id: string;
    };
    firstLine: string;
    geoLocation: any;
    zone: {
        name: string;
        nameAr: string;
        _id: string;
    };
}

interface Shipment {
    CreateDate: string;
    CurrentStatus: {
        code: number;
        state: string;
        timestamp: string;
    };
    PromisedDate: string;
    ScheduleDate: string;
    TrackingNumber: string;
    TransitEvents: Array<{
        state: string;
        timestamp: string;
        hub?: string;
        reason?: string;
        code: number;
        msg?: string;
    }>;
    Type: string;
    canPayOnline: boolean;
    canRequestPOSMachine: boolean;
    collectedFromBusiness: string;
    deliveryCountryCode: string;
    isEditableShipment: boolean;
    isOnlinePaymentFeatureEnabled: boolean;
    nextWorkingDay: Array<{
        dayDate: string;
        dayName: string;
    }>;
    provider: string;
    DropOffAddress: DropOffAddress; // Add this line
}

export default Shipment;