import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export const NumberInput = props => {
  const { label, value, isGrouped, onChange, disabled, isNegative, isError } = props;
  useEffect(() => {
    if (!value) {
      setDefaultValue('');
    } else if (/^-?[0-9]\d*\.?\d*$/.test(value) || /^\d*\.?\d*$/.test(value)) {
      setDefaultValue(value)
    }
  }, [value])

  const [defaultValue, setDefaultValue] = useState(value || '');
  const handleChange = ev => {
    const value = ev.target.value;
    if (isNegative) {
      if (value === '' || value === '-') {
        setDefaultValue(value);
      }
      if (/^-?[0-9]\d*\.?\d*$/.test(value)) {
        setDefaultValue(value);
      }
    } else {
      if (!value) {
        setDefaultValue('')
      }
      if (/^\d*\.?\d*$/.test(value)) {
        setDefaultValue(value);
      }
    }
    onChange && onChange(value);
  }

  return (
    <>
      {
        isGrouped ?
          <span className="input-group-text">{label}</span> :
          <label className="form-label">{label}</label>
      }
      <input
        disabled={disabled}
        type="text"
        className={`form-control text-center ${isError && 'is-invalid'}`}
        onChange={handleChange}
        value={defaultValue}
      />
      <div className="invalid-feedback">
        &nbsp;Введите число
      </div>
    </>
  )
}

NumberInput.propTypes = {
  onChange: PropTypes.func,
  isGrouped: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  label: PropTypes.any,
}

NumberInput.defaultProps = {
  label: '',
  isGrouped: false,
  disabled: false
}
