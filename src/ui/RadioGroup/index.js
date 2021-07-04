import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

export const RadioGroup = props => {
  const { items, value, label, onSelect, name } = props;

  const [defaultValue, setDefaultValue] = useState(value || '');
  useEffect(() => {
    if (value !== defaultValue) {
      setDefaultValue(value);
    }
  }, [value, defaultValue])

  const handleChange = ev => {
    const val = ev.target.value;
    setDefaultValue(val);
    onSelect && onSelect(val);
  }

  return (
    <>
      { label && <label className="form-label">{label}</label> }
      {
        items.map((one, index) => {
          return (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value={one.value}
                name={name}
                id={`${name}${index}`}
                checked={defaultValue.toString() === one.value.toString()}
                onChange={handleChange}
              />
              <label
                htmlFor={`${name}${index}`}
                className="form-check-label">
                {one.key}
              </label>
            </div>
          );
        })
      }
    </>
  );
}

RadioGroup.propTypes = {
  onSelect: PropTypes.func,
  name: PropTypes.string,
  items: PropTypes.array,
  value: PropTypes.any,
  label: PropTypes.any,
}

RadioGroup.defaultProps = {
  label: '',
  items: [],
  name: '',
}