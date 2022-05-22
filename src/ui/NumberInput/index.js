import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export const NumberInput = props => {
  const {
    label,
    value,
    isGrouped,
    onChange,
    isNegative,
    isError,
    maxValue,
    minValue,
    errorText,
    inputProps,
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
        {...inputProps}
        type="number"
        onWheel={(e) => e.target.blur()}
        className={`form-control text-center ${isError ? 'is-invalid' : ''}`}
        onChange={handleChange}
        value={defaultValue}
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
  value: PropTypes.any,
  label: PropTypes.any,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  inputProps: PropTypes.shape({
    required: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
  })
}

NumberInput.defaultProps = {
  label: '',
  errorText: '',
  isGrouped: false,
}
