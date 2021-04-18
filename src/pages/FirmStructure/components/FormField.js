import { Form } from 'react-bootstrap';
import React from 'react';

const FormField = ({
  groupClass, type, placeholder, nameAndId, value,
  label, errorText = '', handleBlur, handleChange
}) => (
  <Form.Group className={groupClass}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      autoComplete="off"
      id={nameAndId}
      name={nameAndId}
      type={type}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
    />
    <Form.Text className="text-danger">
      {errorText}
    </Form.Text>
  </Form.Group>
);

export default FormField;
