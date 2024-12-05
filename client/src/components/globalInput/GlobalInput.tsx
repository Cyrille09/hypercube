import classNames from "classnames";
import React, { CSSProperties, ReactNode } from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";
import styles from "./input.module.scss";

interface InputProps {
  type?:
    | "button"
    | "text"
    | "checkbox"
    | "file"
    | "color"
    | "date"
    | "email"
    | "hidden"
    | "image"
    | "datetime-local"
    | "url"
    | "number"
    | "month"
    | "radio"
    | "submit"
    | "tel"
    | "week"
    | "password"
    | "reset"
    | "range"
    | "search"
    | "time";
  name: string;
  id?: string;
  placeholder?: string;
  label?: string;
  size?: string;
  disabled?: boolean;
  className?: any;
  min?: number;
  required?: boolean;
  max?: number;
  onBlur?: any;
  autoCapitalize?: any;
  // onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: any;

  autoCorrect?: any;
  value?: any;
  style?: CSSProperties;
  onChangeCapture?: any;
  children?: ReactNode;
  accept?: any;
  error?: any;
}

export function GlobalInput({
  type = "text",
  name = "",
  id,
  placeholder,
  label = "",
  size = "",
  disabled,
  min,
  required,
  max,
  onBlur,
  autoCapitalize,
  onChange,
  autoCorrect,
  style,
  onChangeCapture,
  accept,
}: InputProps) {
  const [field, meta] = useField(name);
  const isInvalid = meta.error && meta.touched;
  return (
    <div className={classNames(styles.field)}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label} {""}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <Form.Control
        style={style}
        {...field}
        type={type}
        id={id}
        name={name}
        className={classNames(
          "form-control",
          size,
          isInvalid && styles.isInvalid
        )}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        onBlur={onBlur}
        autoCapitalize={autoCapitalize}
        onChange={onChange}
        autoCorrect={autoCorrect}
        onChangeCapture={onChangeCapture}
        accept={accept}
      />
      {isInvalid && <p className={styles.invalidFeedback}>{meta.error}</p>}
    </div>
  );
}
