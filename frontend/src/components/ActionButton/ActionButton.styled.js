import styled from "styled-components";

const ActionButton = styled.button`
  width: 15rem;
  font-size: 1rem;
  margin: 0 2rem;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #52b788;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #398360;
  }
  &:active {
    background-color: #2c6a4d;
  }
`;

export { ActionButton };
