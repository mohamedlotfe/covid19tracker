import React, { useEffect, useState } from "react";
import GlobalCasesStatisticsCard from "./GlobalCasesStatisticsCard";

const baseURL = process.env.REACT_APP_API_URL;

const CountriesCard: React.FC = () => {
  const [topCountries, setTopCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseURL + "getTopCountriesData");
      const countries = await response.json();

      setTopCountries(countries.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="top-countries-title">Top 5 Countries in Covid-19 Cases</h2>
      <ul className="top-countries-list">
        {topCountries.map((country, index) => (
          <li key={country.id ?? index} className="top-country-item">
            <span className="country-name">{country.country}:</span> <span className="infected-cases">{country.infected}</span>
          </li>
        ))}
      </ul>
      <GlobalCasesStatisticsCard data={topCountries}/>

    </div>
  );
};

export default CountriesCard;
