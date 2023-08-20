import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FlightItem from './FlightItem';
import ErrorMessage from './ErrorNotification';
import SearchForm from './SearchForm';
import Loading from './LoadingAnimation';
import { mockFlights } from './mockFlights';

function SearchBox() {
    // Arama ile ilgili state'ler
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [isOneWay, setIsOneWay] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // Hata ve yüklenme durumu ile ilgili state'ler
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Sıralama ile ilgili state
    const [sortOption, setSortOption] = useState('');

    // Öneri ile ilgili state'ler
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState([]);

    // Uzaklık hesaplaması
    function haversineDistance(coords1, coords2) {
        function toRad(value) {
            return value * Math.PI / 180;
        }
        var R = 6371; // Dünya'nın yarıçapı km cinsinden
        var dLat = toRad(coords2.lat - coords1.lat);
        var dLng = toRad(coords2.lng - coords1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = R * c;

        return distance;
    }

    // Arama önerileri ile ilgili fonksiyonlar
    const uniqueAirports = [...new Set([...mockFlights.map(flight => flight.departure), ...mockFlights.map(flight => flight.arrival)])];

    const suggestDepartureAirports = (query) => {
        if (!query) {
            setDepartureSuggestions([]);
            return;
        }

        const matchedAirports = uniqueAirports.filter(airportCode =>
            airportCode.toLowerCase().includes(query.toLowerCase())
        );

        setDepartureSuggestions(matchedAirports);
    };


    const suggestArrivalAirports = (query) => {
        if (!query) {
            setArrivalSuggestions([]);
            return;
        }

        const matchedAirports = uniqueAirports.filter(airportCode =>
            airportCode.toLowerCase().includes(query.toLowerCase())
        );

        setArrivalSuggestions(matchedAirports);
    };

    // Uçuşları sıralama fonksiyonu
    const sortFlights = (flights) => {
        switch (sortOption) {
            case 'departureTime':
                return [...flights].sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));
            case 'arrivalTime':
                return [...flights].sort((a, b) => new Date(a.returnDate) - new Date(b.returnDate));
            case 'flightDuration':
                return [...flights].sort((a, b) =>
                    haversineDistance(a.departureCoords, a.arrivalCoords) - haversineDistance(b.departureCoords, b.arrivalCoords)
                );
            case 'price':
                return [...flights].sort((a, b) => a.price - b.price);
            default:
                return flights;
        }

    };

    const sortedFlights = sortFlights(searchResults);

    // Form doğrulama fonksiyonu
    const validate = () => {
        let tempErrors = {};

        if (!departureAirport) tempErrors.departureAirport = "Kalkış havaalanı gerekli!";
        if (!arrivalAirport) tempErrors.arrivalAirport = "Varış havaalanı gerekli!";
        if (departureAirport === arrivalAirport) tempErrors.arrivalAirport = "Kalkış ve varış havaalanları aynı olamaz!";
        if (!departureDate) tempErrors.departureDate = "Kalkış tarihi gerekli!";
        if (!isOneWay && !returnDate) tempErrors.returnDate = "Varış tarihi gerekli!";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // Eğer hata yoksa true döner
    };

    // Arama fonksiyonu
    const handleSearch = async () => {
        if (validate()) {
            setError(null); // Hata mesajını sıfırla
            setIsLoading(true); // Yükleniyor durumunu başlat

            try {
                // Örnek olarak 2 saniye bekletme ekliyoruz (simülasyon için)
                await new Promise(resolve => setTimeout(resolve, 2000));

                const results = mockFlights.filter(flight =>
                    flight.departure === departureAirport &&
                    flight.arrival === arrivalAirport &&
                    new Date(flight.departureDate).toDateString() === departureDate.toDateString() &&
                    (isOneWay || new Date(flight.returnDate).toDateString() === returnDate.toDateString())
                );

                // Eğer sonuç yoksa bir hata mesajı ekleyebiliriz
                if (results.length === 0) {
                    throw new Error("Uygun uçuş bulunamadı.");
                }

                setSearchResults(results);
            } catch (err) {
                setError(err.message || "Bir hata oluştu."); // Hata mesajını set edin
            } finally {
                setIsLoading(false); // Yükleniyor durumunu sonlandır
            }
          
        }
    };


    return (
        <div className="search-box">
            <SearchForm
                departureAirport={departureAirport}
                setDepartureAirport={setDepartureAirport}
                arrivalAirport={arrivalAirport}
                setArrivalAirport={setArrivalAirport}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                isOneWay={isOneWay}
                setIsOneWay={setIsOneWay}
                handleSearch={handleSearch}
                suggestDepartureAirports={suggestDepartureAirports}
                suggestArrivalAirports={suggestArrivalAirports}
                departureSuggestions={departureSuggestions}
                arrivalSuggestions={arrivalSuggestions}
                errors={errors}
            />

            {/* Sıralama seçenekleri */}
            <div className="inline-block relative w-auto pl-4 ml-30">
                <label  className="mr-7 text-2xl">Sırala: </label>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Sırala...</option>
                    <option value="departureTime">Kalkış Saatine Göre</option>
                    <option value="arrivalTime">Varış Saatine Göre</option>
                    <option value="flightDuration">Uçuş Uzunluğuna Göre</option>
                    <option value="price">Fiyata Göre</option>
                </select>
                <div class="pointer-events-none absolute inset-y-5 right-2 flex items-center px-2 py-7 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>



            {/* Yükleniyor durumu */}
            {isLoading && <Loading />}
            {error && <ErrorMessage message={error} />}

            {/* Arama sonuçlarını listeleme */}
            <div className="flight-results mt-4">
                {sortedFlights.length > 0 ? (
                    sortedFlights.map(flight => (
                        <FlightItem
                            key={flight.id}
                            flight={flight}
                            flightDuration={haversineDistance(flight.departureCoords, flight.arrivalCoords)}
                        />
                    ))
                ) : (
                    <p></p>
                )}
            </div>

        </div>
    );
}

export default SearchBox;
