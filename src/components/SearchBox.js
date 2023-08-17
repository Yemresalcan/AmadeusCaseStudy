import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FlightItem from './FlightItem';


function SearchBox() {
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [isOneWay, setIsOneWay] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [sortOption, setSortOption] = useState(''); // Sıralama seçeneğini tutacak state
    const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumunu kontrol eden state

    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState([]);


    const mockFlights = [
        {
            id: 1,
            departure: 'IST',
            arrival: 'JFK',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Turkish Airlines',
            price: 500
        },
        {
            id: 2,
            departure: 'LAX',
            arrival: 'LHR',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'British Airways',
            price: 650
        },
        {
            id: 3,
            departure: 'CDG',
            arrival: 'SFO',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Air France',
            price: 600
        },
        {
            id: 4,
            departure: 'SYD',
            arrival: 'DXB',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Emirates',
            price: 800
        },
        {
            id: 5,
            departure: 'SIN',
            arrival: 'HND',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Singapore Airlines',
            price: 450
        },
        {
            id: 6,
            departure: 'YYZ',
            arrival: 'AMS',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'KLM',
            price: 550
        },
        {
            id: 7,
            departure: 'MUC',
            arrival: 'PEK',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Lufthansa',
            price: 700
        },
        {
            id: 8,
            departure: 'ICN',
            arrival: 'JNB',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Korean Air',
            price: 750
        },
        {
            id: 9,
            departure: 'MAD',
            arrival: 'GRU',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Iberia',
            price: 650
        },
        {
            id: 10,
            departure: 'DEL',
            arrival: 'MEL',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Qantas',
            price: 900
        },
        {
            id: 11,
            departure: 'TEST',
            arrival: 'TEST2',
            departureDate: new Date().toISOString(),
            returnDate: new Date().toISOString(),
            airline: 'Korean Air',
            price: 745
        },
    ];

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


    const sortFlights = (flights) => {
        switch (sortOption) {
            case 'departureTime':
                return [...flights].sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));
            case 'arrivalTime':
                return [...flights].sort((a, b) => new Date(a.returnDate) - new Date(b.returnDate));
            case 'flightDuration':
                // Uçuş uzunluğunu hesaplamak için ek bilgilere ihtiyaç duyulabilir.
                // Şimdilik bu seçeneği geçiyorum.
                return flights;
            case 'price':
                return [...flights].sort((a, b) => a.price - b.price);
            default:
                return flights;
        }
    };
    const sortedFlights = sortFlights(searchResults);


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
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Sıralama seçenekleri */}
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">Sırala...</option>
                    <option value="departureTime">Kalkış Saatine Göre</option>
                    <option value="arrivalTime">Varış Saatine Göre</option>
                    <option value="flightDuration">Uçuş Uzunluğuna Göre</option>
                    <option value="price">Fiyata Göre</option>
                </select>

                <input
                    type="text"
                    placeholder="Kalkış Havaalanı"
                    value={departureAirport}
                    onChange={(e) => {
                        setDepartureAirport(e.target.value);
                        suggestDepartureAirports(e.target.value);
                    }}
                />
                {errors.departureAirport && <div className="error">{errors.departureAirport}</div>}
                <div className="airport-suggestions">
                    {departureSuggestions.map(airportCode => (
                        <div
                            key={airportCode}
                            onClick={() => {
                                setDepartureAirport(airportCode);
                                setDepartureSuggestions([]); // Önerileri temizle
                            }}
                        >
                            {airportCode}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Varış Havaalanı"
                    value={arrivalAirport}
                    onChange={(e) => {
                        setArrivalAirport(e.target.value);
                        suggestArrivalAirports(e.target.value);
                    }}
                />
                {errors.arrivalAirport && <div className="error">{errors.arrivalAirport}</div>}
                <div className="airport-suggestions">
                    {arrivalSuggestions.map(airportCode => (
                        <div
                            key={airportCode}
                            onClick={() => {
                                setArrivalAirport(airportCode);
                                setArrivalSuggestions([]); // Önerileri temizle
                            }}
                        >
                            {airportCode}
                        </div>
                    ))}
                </div>
                <DatePicker
                    selected={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    placeholderText="Kalkış Tarihi"
                />
                {errors.departureDate && <div className="error">{errors.departureDate}</div>}

                <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    placeholderText="Varış Tarihi"
                    disabled={isOneWay}
                />
                {errors.returnDate && <div className="error">{errors.returnDate}</div>}

                <label>
                    <input
                        type="checkbox"
                        checked={isOneWay}
                        onChange={() => setIsOneWay(!isOneWay)}
                    />
                    Tek Yönlü Uçuş
                </label>

                <button onClick={handleSearch}>Ara</button>
            </form>
            {/* Yükleniyor durumu */}
            {isLoading && <div className="loading">Yükleniyor...</div>}
            {error && <div className="error">{error}</div>}

            {/* Arama sonuçlarını listeleme */}
            <div className="flight-results">
                {searchResults.map(flight => (
                    <FlightItem key={flight.id} flight={flight} />
                ))}
            </div>
        </div>
    );
}


export default SearchBox;
