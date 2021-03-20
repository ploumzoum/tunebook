import { useState } from 'react';

export default function FormInput(props) {
  const { children, errors, triedSubmit, className = '', ...nextProps } = props;
  const showErrors = errors.length > 0 && triedSubmit;
  const classNames = `formInput ${showErrors ? 'error' : ''} ${className}`;

  return (
    <div className={classNames} {...nextProps}>
      {Array.isArray(children) && children.slice(0, 2)}
      {!Array.isArray(children) && children}
      {showErrors &&
        errors &&
        errors.map((error) => (
          <p className="error" key={error}>
            Ce champs est requis.
          </p>
        ))}
      {Array.isArray(children) && children.length > 1 && children.slice(2)}
    </div>
  );
}
