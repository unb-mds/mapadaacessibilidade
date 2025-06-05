import "./styles.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { hasPwdEye = false } = props;

  const togglePasswordView = () => setShowPassword((old) => !old);

  return (
    <div className="input-container">
      <input
        placeholder={props.placeholder}
        name={props.name}
        type={
          (hasPwdEye && (showPassword ? "text" : "password")) ||
          props.type ||
          "text"
        }
        classname="input-field"
      />
      {hasPwdEye &&
        (showPassword ? (
          <FaEyeSlash className="eye-icon" onClick={togglePasswordView} />
        ) : (
          <FaEye className="eye-icon" onClick={togglePasswordView} />
        ))}
    </div>
  );
};
