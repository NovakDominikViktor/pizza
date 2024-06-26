import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils'; // Import act
import PizzaModPage from './PizzaModPage';

describe('PizzaModPage', () => {
    test('renders form fields and handles modification', async () => {
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
                <MemoryRouter initialEntries={['/mod-pizza/1']}>
                    <Routes>
                        <Route path="/mod-pizza/:id" element={<PizzaModPage />} />
                    </Routes>
                </MemoryRouter>
            );
        });

       
        await screen.findByText('Pizza módosítás');

        
        expect(screen.getByLabelText('Név:')).toHaveValue(mockPizza.name);
        expect(screen.getByLabelText('Gluténmentes:')).not.toBeChecked();
        expect(screen.getByLabelText('Kép URL:')).toHaveValue(mockPizza.kepURL);

      
        fireEvent.change(screen.getByLabelText('Név:'), { target: { value: 'Pepperoni' } });
        fireEvent.click(screen.getByLabelText('Gluténmentes:'));
        fireEvent.change(screen.getByLabelText('Kép URL:'), { target: { value: 'https://example.com/image2.jpg' } });

       
        fireEvent.click(screen.getByText('Küldés'));

       
        expect(global.fetch).toHaveBeenCalledWith(`https://pizza.kando-dev.eu/Pizza/${mockPizza.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: mockPizza.id,
                name: 'Pepperoni',
                isGlutenFree: 1, // Convert to number
                kepURL: 'https://example.com/image2.jpg',
            }),
        });

        
        expect(window.location.pathname).toBe('/');
    });
});