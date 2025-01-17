type TimelineState =
    | 'Shipment Created'
    | 'Picked Up'
    | 'In Transit'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled'
    | 'Returned';

export default TimelineState;