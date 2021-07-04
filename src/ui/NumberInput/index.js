import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export const NumberInput = props => {
  const { label, value, isGrouped, onChange, disabled } = props;

  useEffect(() => {
    if (!value) {
      setDefaultValue('');
    }
  }, [value])

  const [defaultValue, setDefaultValue] = useState(value || '');

  const handleChange = ev => {
    const value = ev.target.value;
    if (!value) {
      setDefaultValue('')
    }
    if (/^\d*\.?\d*$/.test(value)) {
      setDefaultValue(value);
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
        className="form-control text-center"
        onChange={handleChange}
        value={defaultValue}
      />
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