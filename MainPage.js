import React from 'react';
import styled from '@emotion/styled';
import { Container, Button } from './SharedStyles';

const IntroContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 20px 0;
`;

const Title = styled.h1`
  color: #1a237e;
  text-align: center;
  margin: 20px 0;
`;

const MainPage = ({ onNavigate }) => {
  return (
    <Container>
      <Title>حاسبة الزكاة الإسلامية</Title>
      <IntroContainer>
        <h2>مرحباً بكم في حاسبة الزكاة</h2>
        <p>الزكاة هي الركن الثالث من أركان الإسلام</p>
        <h3>تساعدك هذه الحاسبة في حساب زكاة:</h3>
        <ul>
          <li>النقود والأموال السائلة</li>
          <li>الذهب والفضة</li>
          <li>عروض التجارة</li>
          <li>الأسهم والاستثمارات</li>
        </ul>
      </IntroContainer>
      <Button onClick={onNavigate}>حاسبة الزكاة</Button>
    </Container>
  );
};

export default MainPage;