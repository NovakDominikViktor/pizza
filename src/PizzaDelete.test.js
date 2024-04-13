import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import PizzaDeletePage from './PizzaDeletePage';

describe('PizzaDeletePage', () => {
    test('renders delete confirmation page and handles deletion', async () => {
        const mockPizza = {
            id: 1,
            name: 'Margarita',
            isGlutenFree: false,
            kepURL: 'https://example.com/image1.jpg'
        };

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: () => Promise.resolve(mockPizza)
        });

        await act(async () => { 
            render(
                <MemoryRouter initialEntries={['/del-pizza/1']}>
                    <Routes>
                        <Route path="/del-pizza/:id" element={<PizzaDeletePage />} />
                    </Routes>
                </MemoryRouter>
            );
        });

      
        expect(screen.getByText('Pizza törlése')).toBeInTheDocument();
        expect(screen.getByText('Margarita')).toBeInTheDocument();
        expect(screen.getByText('Gluténmentes: Nem')).toBeInTheDocument();
        expect(screen.getByAltText('hiányzik a képed innen!')).toBeInTheDocument();

        
        fireEvent.submit(screen.getByText('Törlés'));

     
        expect(global.fetch).toHaveBeenCalledWith('https://pizza.kando-dev.eu/Pizza/1', {
            method: 'DELETE',
        });

        
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
});