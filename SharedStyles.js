import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 800px;
  margin: 60px auto 20px;
  padding: 20px;
`;

export const Button = styled.button`
  background-color: #1a237e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 20px auto;
  min-width: 200px;

  &:hover {
    background-color: #0d47a1;
  }
`;