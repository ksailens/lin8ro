import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export const Select = props => {
  const { onChange, items, value, label } = props;
  const [selectedValue, setValue] = useState(value || '');

  useEffect(() => {
    if (value !== selectedValue) {
      setValue(value);
    }
  }, [value, selectedValue])

  const handleChange = ev => {
    setValue(ev.target.value);
    onChange && onChange(ev.target.value);
  }

  return (
    <>
      { label && <label className="form-label">{label}</label> }
      <select className={'form-select'} value={selectedValue} onChange={handleChange}>
        {
          items.map((one, index) => <option key={index} disabled={!one.value} value={one.value}>{one.key}</option>)
        }
      </select>
    </>
  );
}

Select.propTypes = {
  onChange: PropTypes.func,
  items: PropTypes.array,
  value: PropTypes.any,
  label: PropTypes.any,
}

Select.defaultProps = {
  items: []
}