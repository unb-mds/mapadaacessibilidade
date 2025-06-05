import './styles.css';

export const Button = (props) => {
  return (
    <button type="button" className="button-primary" onClick={props.onClick}>
      {props.label}
    </button>
  );
};
