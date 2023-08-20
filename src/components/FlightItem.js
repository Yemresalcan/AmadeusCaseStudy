import React from 'react';

function FlightItem({ flight, flightDuration }) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src="https://itbrief.com.au/uploads/story/2016/06/08/ThinkstockPhotos-177708665.webp" alt="Movie"/></figure>
  <div className="card-body mt-5">
  <h3 className="text-lg font-semibold">{flight.departure} - {flight.arrival}</h3>
  <div className="stat-title  "> <strong>Hava Yolu :</strong>  {flight.airline} </div>
    <div className="stat-title "><strong>Kalkış Tarihi:</strong> {new Date(flight.departureDate).toLocaleString()}</div>
    <div className="stat-title "><strong>Varış Tarihi:</strong> {new Date(flight.returnDate).toLocaleString()}</div>
    <div className="stat-title "><strong>Fiyat:</strong> ${flight.price}</div>
    <div className="stat-title "><strong>Uçuş Uzunluğu:</strong> {flightDuration.toFixed(2)} km</div>
    </div>
  </div>
  );
}

export default FlightItem;


