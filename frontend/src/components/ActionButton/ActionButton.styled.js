import styled from "styled-components";

const ActionButton = styled.button`
  font-size: 2rem;
  magin: 1rem 0;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 10px;
  background-color: #52b788;
  font-weight: 500;
  padding: 0.25 rem 1 rem;
  border-radius: 10 px;
  cursor: pointer;
  &:hover {
    background-color: #398360;
  }
  &:active {
    background-color: #2c6a4d;
  }
`;

export { ActionButton };
