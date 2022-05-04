import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export const NumberInput = props => {
  const {
    label,
    value,
    isGrouped,
    onChange,
    disabled,
    isNegative,
    isError,
    maxValue,
    minValue,
    isRequired,
    errorText
  } = props;

  useEffect(() => {
    if (!value && value !== 0) {
      setDefaultValue('');
    } else if (/^-?[0-9]\d*\.?\d*$/.test(value) || /^\d*\.?\d*$/.test(value)) {
      setDefaultValue(value)
    }
  }, [value])

  useEffect(() => {
    if (value && onChange) {
      if (maxValue && value > maxValue) {
        onChange(maxValue)
      }
      if (minValue && value < minValue) {
        onChange(minValue)
      }
    }
  }, [maxValue, minValue, onChange, value])

  const [defaultValue, setDefaultValue] = useState(value || '');
  const handleChange = ev => {
    const initialValue = ev.target.value;
    let value = initialValue;

    if (maxValue && initialValue > maxValue) {
      value = maxValue;
    }
    if (minValue && initialValue < minValue) {
      value = minValue;
    }


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
        required={isRequired}
      />
      {!isGrouped && (<div className="invalid-feedback">
        {errorText ? errorText : (isError && `Введите число`)}
      </div>)}
    </>
  )
}

NumberInput.propTypes = {
  onChange: PropTypes.func,
  isGrouped: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  label: PropTypes.any,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  isRequired: PropTypes.bool,
  errorText: PropTypes.string,
}

NumberInput.defaultProps = {
  label: '',
  errorText: '',
  isGrouped: false,
  disabled: false,
  isRequired: false
}
