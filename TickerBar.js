import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const TickerContainer = styled.div`
  background: linear-gradient(45deg, #1a237e, #0d47a1);
  color: white;
  padding: 10px 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  overflow: hidden;
`;

const TickerContent = styled.div`
  white-space: nowrap;
  animation: ticker 30s linear infinite;
  padding-right: 100%;

  @keyframes ticker {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`;

const TickerBar = ({ goldPrice }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TickerContainer>
      <TickerContent>
        {`التاريخ والوقت: ${currentDateTime.toLocaleString('ar-SA')} | 
          سعر جرام الذهب: ${goldPrice} ريال سعودي`}
      </TickerContent>
    </TickerContainer>
  );
};

export default TickerBar;