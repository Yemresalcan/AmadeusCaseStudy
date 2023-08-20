import React from 'react';
import FlightItem from './FlightItem';

function FlightList({ flights }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flights.map(flight => (
                <div key={flight.id} className="bg-white p-4 rounded-lg shadow-md">
                    <FlightItem flight={flight} />
                </div>
            ))}
        </div>
    );
}

export default FlightList;
