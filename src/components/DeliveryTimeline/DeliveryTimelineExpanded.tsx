import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DeliveryTimeline from "./DeliveryTimeline.tsx";

const DeliveryTimelineExpanded = ({ shipment }: { shipment: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollToPosition = (position: number) => {
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    };

    const handleShowMore = () => {
        setIsExpanded(true);
        // Wait for the expanded content to render
        setTimeout(() => {
            if (scrollContainerRef.current) {
                const containerBottom = scrollContainerRef.current.getBoundingClientRect().bottom;
                const scrollPosition = window.pageYOffset + containerBottom - window.innerHeight + 100;
                scrollToPosition(scrollPosition);
            }
        }, 100);
    };

    const handleShowLess = () => {
        if (contentRef.current) {
            const offset = contentRef.current.offsetTop;
            scrollToPosition(offset - 20);
            // Wait for the scroll to complete before collapsing
            setTimeout(() => {
                setIsExpanded(false);
            }, 500);
        }
    };

    return (
        <div className="timeline-container" ref={contentRef}>
            {!isExpanded ? (
                <div className="timeline-preview">
                    <DeliveryTimeline shipment={shipment} />
                    <div className="fade-overlay"></div>
                    <button
                        onClick={handleShowMore}
                        className="expand-button"
                    >
                        <span>More</span>
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="timeline-expanded">
                    <div className="timeline-scroll-container" ref={scrollContainerRef}>
                        <DeliveryTimeline shipment={shipment} />
                        <button
                            onClick={handleShowLess}
                            className="collapse-button"
                        >
                            <span>Less</span>
                            <ChevronUp className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryTimelineExpanded;