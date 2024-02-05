import React from 'react';
import CountriesCard from './CountriesCard';

const MainPage: React.FC = () => {
  return (
    <div>
      <h1 className='main-title'>Covid19 Tracking</h1>
      <CountriesCard />
      
    </div>
  );
};

export default MainPage;