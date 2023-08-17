import React from 'react';
import FlightItem from './FlightItem'; // FlightItem bileşenini import edin

function FlightList({ flights }) {
    return (
        <div>
            {flights.map(flight => (
                <FlightItem key={flight.id} flight={flight} /> // Her bir uçuş için FlightItem bileşenini kullanın
            ))}
        </div>
    );
}

export default FlightList;