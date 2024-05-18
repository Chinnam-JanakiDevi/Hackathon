import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import { DiseaseDetails, Disease } from './DiseaseService';

interface CovidTimeline {
    cases: { [date: string]: number };
    deaths: { [date: string]: number };
    recovered: { [date: string]: number };
}


const CountrySelector: React.FC = () => {
    const [countries] = useState<string[]>(['India', 'USA', 'Brazil']);
    const [selectedCountry, setSelectedCountry] = useState<string>('India');
    const [covidData, setCovidData] = useState<CovidTimeline | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await Disease(selectedCountry);
                setCovidData(data.timeline);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [selectedCountry]);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value);
    };
    return (
        <>
            <div>
                <label htmlFor="country-select">Select Country: </label>
                <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default CountrySelector;
