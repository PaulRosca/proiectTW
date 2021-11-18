import React from "react";
import { FormGroupContainer, InputLabel, Input } from "./FormGroup.styled";

export default function FormGroup({ id, type, value, onChange, label, error }) {
  return (
    <FormGroupContainer>
      <Input id={id} type={type} value={value} onChange={onChange} error={error}/>
      <InputLabel hasValue={value !== ""} htmlFor={id} error={error}>
        {label}
      </InputLabel>
    </FormGroupContainer>
  );
}
