import React from "react";

import "./Input.css";

import applySuitableValidators from "../../util/validators";

const Input = (props) => {
  const validators = applySuitableValidators(props);

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        name={props.id}
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.id, validators)}
      />
    ) : (
      <textarea
        id={props.id}
        name={props.id}
        rows={props.rows || 3}
        {...props.register(props.id, validators)}
      />
    );

  return (
    <div
      className={`form-control ${
        props.errors[props.id] && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {(props.errors[props.id]?.type === "required" ||
        props.errors[props.id]?.type === "minLength" ||
        props.errors[props.id]?.type === "validate" ||
        props.errors[props.id]?.type === "validator" ||
        props.errors[props.id]?.type === "pattern") && (
        <p>{props.errors[props.id].message}</p>
      )}
    </div>
  );
};

export default Input;
