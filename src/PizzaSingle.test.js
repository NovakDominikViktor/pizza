import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils'; 
import PizzaSinglePage from './PizzaSinglePage';

describe('PizzaSinglePage', () => {
    test('renders single pizza details', async () => {
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
                <MemoryRouter initialEntries={['/pizza/1']}>
                    <Routes>
                        <Route path="/pizza/:id" element={<PizzaSinglePage />} />
                    </Routes>
                </MemoryRouter>
            );
        });

       
        expect(screen.getByText('Margarita')).toBeInTheDocument();
        expect(screen.getByText('Gluténmentes: Nem')).toBeInTheDocument();
        expect(screen.getByAltText('hiányzik a képed innen!')).toBeInTheDocument();
    });
});