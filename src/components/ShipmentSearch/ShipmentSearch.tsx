import {FormEvent, useState} from "react";
import { Search } from 'lucide-react';
import axios from "axios";

interface ShipmentSearchProps {
    onShipmentFound: (data: any) => void;
    onError: (status: number) => void;
}
const ShipmentSearch = ({ onShipmentFound, onError }: ShipmentSearchProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [statusCode, setStatusCode] = useState(null); // Store error messages
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!searchValue.trim()) return;
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://tracking.bosta.co/shipments/track/${searchValue}`,
                {
                    headers: {
                        "x-requested-by": "Bosta",
                    },
                }
            );
            onShipmentFound(response.data);
        } catch (error: any) {
            onError(error.response?.data.status);
            setStatusCode(error.response?.data.status);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={`container`}>
            <div className={`wrapper`}>
                <form onSubmit={handleSubmit} className={`form`}>
                    <div className={`inputGroup`}>
                        <button
                            type="submit"
                            className={`submitButton`}
                            aria-label="Search"
                            disabled={isLoading}
                        >
                            <Search className={`submitIcon`} />
                        </button>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={`inputField`}
                            placeholder="Track Number"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShipmentSearch;