import { Form } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

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
FormField.propTypes = {
  groupClass: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  nameAndId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormField;
