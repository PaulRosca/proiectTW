import styled from "styled-components";

const FormGroupContainer = styled.div`
  margin: 2rem 4rem;
  position: relative;
  width: 20rem;
  height: 3rem;
`;

const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: ${(props) => (props.error ? "#a50000" : "#536471")};
  font-size: 1.5rem;
  font-weight: 500;
  width: 100%;
  height: 3rem;
  transform: ${(props) => (props.hasValue ? `translateY(-2.5rem)` : `none`)};
  -webkit-transition: 0.3s ease-in-out;
  -moz-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
`;

const Input = styled.input`
  height: 3rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  padding: 0 1rem;
  border-radius: 10px;
  width: 100%;
  border: none;
  background-color: #202327;
  position: absolute;
  box-shadow: ${(props) => (props.error ? "0 0 0 2px #991716" : "none")};
  &:focus {
    outline: none;
  }
  &:focus + ${InputLabel} {
    transform: translateY(-2.5rem);
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
