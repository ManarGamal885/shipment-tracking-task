import Shipment from "../../types/Shipment.ts";

interface DeliveryTimelineProps {
    shipment: Shipment;
}

interface TransitEvent {
    state: string;
    timestamp: string;
    hub?: string;
    reason?: string;
    code: number;
    msg?: string;
}

const DeliveryTimeline = ({ shipment }: DeliveryTimelineProps) => {
    if (!shipment || !shipment.TransitEvents) {
        return <div>No shipment data available</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const groupedEvents = shipment.TransitEvents.reduce((groups: { [key: string]: TransitEvent[] }, event) => {
        const date = event.timestamp.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(event);
        return groups;
    }, {});

    const sortedDates = Object.keys(groupedEvents).sort((a, b) =>
        new Date(a).getTime() - new Date(b).getTime()
    );

    const getStageColor = (dateEvents: TransitEvent[]) => {
        const currentStatusCode = shipment.CurrentStatus.code;
        const dateStatusCode = dateEvents[0].code;

        if (dateStatusCode < currentStatusCode) {
            return '#4B5563'; // Dark gray for past stages
        } else if (dateStatusCode === currentStatusCode) {
            return '#00A5A5'; // Highlight color for current stage
        } else {
            return '#D1D5DB'; // Light gray for future stages
        }
    };

    return (
        <div className="tracking-container">
            <div className="tracking-title">Tracking Details</div>

            <div className="tracking-timeline">
                {sortedDates.map((date, index) => {
                    const events = groupedEvents[date];
                    const color = getStageColor(events);
                    const isLast = index === sortedDates.length - 1;
                    const nextEvents = !isLast ? groupedEvents[sortedDates[index + 1]] : null;

                    return (
                        <div key={date} className="timeline-group">
                            <div className="timeline-date-container">
                                <div className="timeline-point-wrapper">
                                    <div
                                        className="timeline-point"
                                        style={{ backgroundColor: color }}
                                    />
                                    {!isLast && (
                                        <div
                                            className="timeline-line"
                                            style={{
                                                background: nextEvents
                                                    ? `linear-gradient(to bottom, ${color}, ${getStageColor(nextEvents)})`
                                                    : color
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="timeline-date">
                                    {formatDate(date)}
                                </div>
                            </div>

                            {events.map((event, eventIndex) => (
                                <div key={eventIndex} className="timeline-event">
                                    <div className="event-content">
                                        <div className="event-card">
                                            <div className="event-state">
                                                {event.state}
                                            </div>
                                            <div className="event-time">
                                                {formatTime(event.timestamp)}
                                            </div>
                                            {event.hub && (
                                                <div className="event-detail">
                                                    {event.hub}
                                                </div>
                                            )}
                                            {event.reason && (
                                                <div className="event-detail">
                                                    {event.reason}
                                                </div>
                                            )}
                                            {event.msg && (
                                                <div className="event-detail">
                                                    {event.msg}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DeliveryTimeline;