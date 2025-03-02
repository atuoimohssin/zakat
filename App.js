import React, { useState } from 'react';
import styled from '@emotion/styled';
import TickerBar from './components/TickerBar';
import MainPage from './components/MainPage';
import CalculatorPage from './components/CalculatorPage';

const AppContainer = styled.div`
  direction: rtl;
  text-align: right;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [goldPrice, setGoldPrice] = useState(250); // Default gold price
  
  return (
    <AppContainer>
      <TickerBar goldPrice={goldPrice} />
      {currentPage === 'main' ? (
        <MainPage onNavigate={() => setCurrentPage('calculator')} />
      ) : (
        <CalculatorPage 
          onBack={() => setCurrentPage('main')} 
          goldPrice={goldPrice}
        />
      )}
    </AppContainer>
  );
}

export default App;