import React from "react";
import PropTypes from "prop-types";
import styles from './dropdown.module.scss';

export const DropDown = ({
  blankFirstOption,
  options = [],
  label,
  name,
  onChange,
  error,
}) => {
  const render_OptionsList = () =>
  options.map(({value, id}) => (
      <Option key={value + id} value={value}/>
    ));

  return (
    <div className={styles.formSelect}>
      <label className={styles.dropdown__label} htmlFor={name}>
        {label}
      </label>
      <select
        data-testid="dropdown"
        className={`${styles.dropdown} ${error ? "errored" : ""}`}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      >
        {blankFirstOption && (
          <option className={styles.dropdown__option} value="" >
            Select
          </option>
        )}
        {render_OptionsList()}
      </select>
    </div>
  );
};



DropDown.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
};


export const Option = ({ value }) => {
  return (
    <option className="dropdown__option" value={value}>
      {value}
    </option>
  );
};

Option.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};