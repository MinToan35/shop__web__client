import React, { useRef } from "react";
import "./checkbox.scss";
import Color from "../Color";
const CheckBox = (props) => {
  const inputRef = useRef(null);
  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
      />
      {props.className === "checked-size" && (
        <span className={props.className}>{props.label}</span>
      )}
      {props.className === "checked-color" && (
        <>
          <span className={props.className}>
            <Color color={props.label} />
          </span>
        </>
      )}
    </label>
  );
};

export default CheckBox;
