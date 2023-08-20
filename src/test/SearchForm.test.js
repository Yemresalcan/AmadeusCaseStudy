import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

describe('SearchForm', () => {
  // Mock handleSearch function
  const mockHandleSearch = jest.fn();
  
  // Helper function to render SearchForm with custom errors
  const renderSearchForm = (errors = {}) => {
    return render(
      <SearchForm
        departureAirport=""
        setDepartureAirport={() => {}}
        arrivalAirport=""
        setArrivalAirport={() => {}}
        departureDate={new Date()}
        setDepartureDate={() => {}}
        returnDate={new Date()}
        setReturnDate={() => {}}
        isOneWay={false}
        setIsOneWay={() => {}}
        handleSearch={mockHandleSearch}
        suggestDepartureAirports={() => {}}
        suggestArrivalAirports={() => {}}
        departureSuggestions={[]}
        arrivalSuggestions={[]}
        errors={errors}
      />
    );
  };

  // Test: handles search button click
  it('handles search button click', () => {
    renderSearchForm();
    const searchButton = screen.getByRole('button', { name: 'Uçuşları Ara' });
    fireEvent.click(searchButton);
    expect(mockHandleSearch).toHaveBeenCalled();
  });

  // Test: clears departure and arrival errors when inputs are corrected
  it('clears departure and arrival errors when inputs are corrected', () => {
    // Render the form with errors
    const errors = {
      departureAirport: 'Kalkış havaalanı gerekli!',
      arrivalAirport: 'Varış havaalanı gerekli!',
    };
    renderSearchForm(errors);

    // Correct the inputs
    const departureInput = screen.getByPlaceholderText('Kalkış Havaalanı');
    const arrivalInput = screen.getByPlaceholderText('Varış Havaalanı');
    fireEvent.change(departureInput, { target: { value: 'IST' } });
    fireEvent.change(arrivalInput, { target: { value: 'JFK' } });

    // Click the search button
    const searchButton = screen.getByRole('button', { name: 'Uçuşları Ara' });
    fireEvent.click(searchButton);

    // Check if errors are cleared
    expect(screen.queryByText('Kalkış havaalanı gerekli!')).not.toBeInTheDocument();
    expect(screen.queryByText('Varış havaalanı gerekli!')).not.toBeInTheDocument();
  });
});
