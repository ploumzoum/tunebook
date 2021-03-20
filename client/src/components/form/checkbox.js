export default function Checkbox(props) {
  const { onChange, checked, disabled, label, className = '' } = props;
  return (
    <div
      className={`checkbox ${disabled ? 'disabled' : ''} ${className}`}
      onClick={() => !disabled && onChange()}
    >
      <div
        className={`square ${checked ? 'checked' : ''} ${
          disabled ? 'disabled' : ''
        }`}
      >
        {checked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.75L3.4 7L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && <span>{label}</span>}
    </div>
  );
}
