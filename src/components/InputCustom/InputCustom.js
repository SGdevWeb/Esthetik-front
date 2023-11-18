import styles from "./InputCustom.module.scss";

function InputCustom({
  id,
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  min,
  max,
  style,
}) {
  return (
    <div className={styles.container} style={style}>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
      />
    </div>
  );
}

export default InputCustom;
