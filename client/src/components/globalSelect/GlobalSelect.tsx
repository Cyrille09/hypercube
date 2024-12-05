import { useField } from "formik";
import React, { CSSProperties } from "react";
import { Form } from "react-bootstrap";
import styles from "./select.module.scss";
import classNames from "classnames";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  name?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  options?: SelectOption[];
  disabledPlaceholder?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  labelStyle?: CSSProperties;
  disabled?: boolean;
  onChangeCapture?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: CSSProperties;
}

export function GlobalSelect({
  name = "",
  id,
  placeholder = "Please select",
  label,
  options = [],
  disabledPlaceholder = true,
  onChange,
  required = false,
  labelStyle = {},
}: SelectProps) {
  return (
    <div className="d-flex align-items-center">
      {label && (
        <label style={labelStyle} htmlFor={id || name} className="me-2">
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <Form.Select
        id={id || name}
        name={name}
        aria-label={placeholder}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled={disabledPlaceholder}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export function GlobalSelectWithformik({
  name = "",
  id,
  placeholder = "Please select",
  label,
  options = [],
  disabledPlaceholder = true,
  onChange,
  required = false,
  disabled = false,
  onChangeCapture,
  style,
}: SelectProps) {
  const [field, meta] = useField(name);
  const isInvalid = meta.error && meta.touched;

  return (
    <div className={classNames(styles.field)}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label} {""} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <Form.Select
        style={style}
        {...field}
        id={id}
        name={name}
        onChangeCapture={onChangeCapture}
        onChange={(event) => {
          // Call the formik onChange handler first!
          field.onChange(event);
          // Call custom onChange after
          if (onChange) {
            onChange(event);
          }
        }}
        className={classNames(isInvalid && styles.invalid)}
        disabled={disabled}
      >
        <option value="" disabled={disabledPlaceholder}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {isInvalid && <p className={styles.error}>{meta.error}</p>}
    </div>
  );
}
