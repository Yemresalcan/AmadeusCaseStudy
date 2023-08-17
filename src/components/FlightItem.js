import React from 'react';

function FlightItem({ flight }) {
  return (
    <div className="flight-item">
      <div className="flight-header">
        <h3>{flight.departure} - {flight.arrival}</h3>
      </div>
      <div className="flight-details">
        <p><strong>Havayolu:</strong> {flight.airline}</p>
        <p><strong>Kalkış Tarihi:</strong> {new Date(flight.departureDate).toLocaleString()}</p>
        <p><strong>Varış Tarihi:</strong> {new Date(flight.returnDate).toLocaleString()}</p>
        <p><strong>Fiyat:</strong> ${flight.price}</p>
      </div>
    </div>
  );
}

export default FlightItem;