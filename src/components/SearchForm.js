import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function SearchForm(props) {
  
    const {
        departureAirport,
        setDepartureAirport,
        arrivalAirport,
        setArrivalAirport,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        isOneWay,
        setIsOneWay,
        handleSearch,
        suggestDepartureAirports,
        suggestArrivalAirports,
        departureSuggestions,
        arrivalSuggestions,
        errors
    } = props;
    

    const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
    const [showArrivalSuggestions, setShowArrivalSuggestions] = useState(false);

    useEffect(() => {
        const closeSuggestions = () => {
            setShowDepartureSuggestions(false);
            setShowArrivalSuggestions(false);
        };

        document.addEventListener("click", closeSuggestions);

        return () => {
            document.removeEventListener("click", closeSuggestions);
        };
    }, []);

    const handleDepartureInputChange = (value) => {
        setDepartureAirport(value);
        suggestDepartureAirports(value);
        setShowDepartureSuggestions(true);
    };

    const handleArrivalInputChange = (value) => {
        setArrivalAirport(value);
        suggestArrivalAirports(value);
        setShowArrivalSuggestions(true);
    };




    return (
      
        <div className="card w-96 glass center ml-44 mt-5">
              <figure><img src="https://news.gtp.gr/wp-content/uploads/2018/10/Southwest-amadeus-aircraft-1.jpg" alt="car!"/></figure>
              <div className="card-body items-center text-center">
             <h2 class="card-title ml-4">Uçuş Arama Uygulaması !</h2>
             </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Kalkış Havaalanı"
                    value={departureAirport}
                    onChange={(e) => handleDepartureInputChange(e.target.value)}
                    onFocus={() => setShowDepartureSuggestions(true)}
                    className="border border-gray-300 px-3 py-2 ml-4 w-auto rounded focus:outline-none focus:border-yellow-400"
                />
                
                {errors.departureAirport && <div className="alert alert-error mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>  {errors.departureAirport} </span>
                    </div>}
                
                {showDepartureSuggestions && departureSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-2 max-h-28 overflow-y-auto shadow-lg bg-white border border-gray-300 rounded">
                        {departureSuggestions.map(airportCode => (
                            <div
                                key={airportCode}
                                onClick={() => {
                                    setDepartureAirport(airportCode);
                                    setShowDepartureSuggestions(false);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {airportCode}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            

            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Varış Havaalanı"
                    value={arrivalAirport}
                    onChange={(e) => handleArrivalInputChange(e.target.value)}
                    onFocus={() => setShowArrivalSuggestions(true)}
                    className="border border-gray-300 px-3 py-2  ml-4 w-auto rounded focus:outline-none focus:border-cyan-400"
                />
                {errors.arrivalAirport &&
                 <div className="alert alert-error mt-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <span>   {errors.arrivalAirport} </span>
                 </div>}

                {showArrivalSuggestions && arrivalSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-2 max-h-28 overflow-y-auto shadow-lg bg-white border border-gray-300 rounded">
                        {arrivalSuggestions.map(airportCode => (
                            <div
                                key={airportCode}
                                onClick={() => {
                                    setArrivalAirport(airportCode);
                                    setShowArrivalSuggestions(false);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {airportCode}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex space-x-4 mb-4">
                <DatePicker
                    selected={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    placeholderText="Kalkış Tarihi"
                    className="w-full ml-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />

                <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    placeholderText="Varış Tarihi"
                    disabled={isOneWay}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {errors.returnDate && <div className="error text-red-500 mt-1">{errors.returnDate}</div>}

            <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={isOneWay}
                    onChange={() => setIsOneWay(!isOneWay)}
                    className="toggle toggle-sm"
                />
                Tek Yönlü Uçuş
            </label>

            <button onClick={handleSearch} className="btn btn-outline btn-info">
                Ara
            </button>
        </div>
    );
}

export default SearchForm;
