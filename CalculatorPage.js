import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container, Button } from './SharedStyles';

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 20px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #1a237e;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Result = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
`;

const CalculatorPage = ({ onBack, goldPrice }) => {
  const [formData, setFormData] = useState({
    cash: '',
    gold: '',
    silver: '',
    trade: '',
    stocks: '',
    debts: ''
  });
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(formData).map(val => parseFloat(val) || 0);
    const total = values.slice(0, 5).reduce((a, b) => a + b, 0) - values[5];
    const nisab = 85 * goldPrice;
    const zakat = total >= nisab ? total * 0.025 : 0;

    setResult({
      total,
      zakat,
      nisab
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <h1>حساب الزكاة</h1>
      <Form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <FormGroup key={key}>
            <Label>
              {key === 'cash' ? 'النقود والأموال السائلة' :
               key === 'gold' ? 'قيمة الذهب' :
               key === 'silver' ? 'قيمة الفضة' :
               key === 'trade' ? 'قيمة عروض التجارة' :
               key === 'stocks' ? 'قيمة الأسهم والاستثمارات' :
               'الديون المستحقة عليك'}:
            </Label>
            <Input
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </FormGroup>
        ))}
        <Button type="submit">احسب الزكاة</Button>
      </Form>

      {result && (
        <Result>
          <h2>نتيجة حساب الزكاة</h2>
          <p>إجمالي الأموال الزكوية: {result.total.toFixed(2)} ريال</p>
          <p>مقدار الزكاة الواجبة: {result.zakat.toFixed(2)} ريال</p>
          <p>النصاب الحالي: {result.nisab.toFixed(2)} ريال</p>
        </Result>
      )}

      <Button onClick={onBack} style={{ backgroundColor: '#0d47a1' }}>
        العودة للصفحة الرئيسية
      </Button>
    </Container>
  );
};

export default CalculatorPage;