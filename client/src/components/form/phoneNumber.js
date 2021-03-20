import React, { useState, useEffect, useCallback } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Colors } from '../../../../theme';
import MoreHorizontal from '../../../../icons/moreHorizontal';
import CheckMark from '../../../../icons/checkMark';

export default function PhoneNumber(props) {
  const { value, onChange, status = 'unverified', onBlur } = props;
  const StatusIcon = {
    unverified: <MoreHorizontal />,
    pending: <MoreHorizontal />,
    active: <CheckMark />,
    verified: <CheckMark color={Colors.action} />,
  };
  function toInternational(number) {
    if (!number) return;
    const parsed = parsePhoneNumberFromString(number, 'CA');
    return parsed && parsed.number;
  }

  function toDisplayNumber(number) {
    if (!number) return;
    const parsed = parsePhoneNumberFromString(number, 'CA');
    return parsed && parsed.formatNational();
  }

  const [currentValue, setCurrentValue] = useState(value || '');
  const [fieldValue, setFieldValue] = useState(toDisplayNumber(value) || '');

  const handleOnChange = (number) => {
    setFieldValue(number);

    const parsed = toInternational(number);

    if (parsed && parsed !== currentValue) {
      if (onChange) {
        onChange(parsed);
      }
      setCurrentValue(parsed);
    }
  };
  const handleOnBlur = () => {
    const formattedNumber = toDisplayNumber(fieldValue);
    setFieldValue(formattedNumber || fieldValue);
    onBlur && onBlur();
  };

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
      handleOnBlur();
    }
  }, [value, currentValue]);
  useEffect(() => {
    setFieldValue(toDisplayNumber(value) || '');
  }, [value]);
  return (
    <input
      type="text"
      value={fieldValue}
      onChange={(e) => handleOnChange(e.target.value)}
      onBlur={handleOnBlur}
    />
  );
}
