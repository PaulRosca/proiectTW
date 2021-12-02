import styled from "styled-components";

const FormGroupContainer = styled.div`
  margin: 1.5rem 2rem;
  position: relative;
  width: 15rem;
  height: 2rem;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  position: absolute;
  color: ${(props) => (props.error ? "#a50000" : "#536471")};
  font-size: .875rem;
  font-weight: 500;
  padding: 0 1rem;
  width: 100%;
  height: 2rem;
  transform: ${(props) => (props.hasValue ? `translate(-.5rem, -1.5rem)` : `none`)};
  -webkit-transition: 0.3s ease-in-out;
  -moz-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
`;

const Input = styled.input`
  height: 2rem;
  color: white;
  font-size: .875rem;
  font-weight: 500;
  padding: 0 1rem;
  border-radius: 8px;
  width: 100%;
  border: none;
  background-color: #202327;
  position: absolute;
  box-shadow: ${(props) => (props.error ? "0 0 0 2px #991716" : "none")};
  &:focus {
    outline: none;
  }
  &:focus + ${InputLabel} {
    transform: translateY(-1.5rem);
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active,
  &:-internal-autofill-selected,
  &:-internal-autofill-previewed {
    font-size: 1rem;
    font-weight: 500;
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 1000px #202327 inset;
    -webkit-text-fill-color: white !important;
    color: white !important;
    background-color: #202327 !important;
    caret-color: white !important;
  }
`;

export { FormGroupContainer, Input, InputLabel };
