import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SearchBox from '../components/SearchBox';

describe('SearchBox', () => {
  test('handles search with no results', async () => {
    render(<SearchBox />);

    // Fill in search form inputs
    const departureInput = screen.getByLabelText('Kalkış Havalimanı'); 
    const arrivalInput = screen.getByLabelText('Varış Havalimanı');
    const searchButton = screen.getByText('Uçuşları Ara');

    fireEvent.change(departureInput, { target: { value: 'IST' } });
    fireEvent.change(arrivalInput, { target: { value: 'LAX' } });

    fireEvent.click(searchButton);

    // Wait for loading animation to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('loading-animation')).not.toBeInTheDocument();
    });

    // Check if no results message is displayed
    expect(screen.getByText('Uygun uçuş bulunamadı.')).toBeInTheDocument();

    // Check if error message is not displayed
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });


});
