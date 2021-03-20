const emailFormatValidator = (value) =>
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    value,
  );
const minLengthValidator = (value, charLimit) => value.length >= charLimit;
const requiredValidator = (value) =>
  value !== '' && value !== [] && value !== {};

export default function validate(fields) {
  let isValid = true;
  Object.values(fields).forEach((field) => {
    field.validators &&
      field.validators.forEach((validator) => {
        switch (true) {
          case /emailFormat/.test(validator):
            if (!emailFormatValidator(field.value)) {
              isValid = false;
              !field.errors.includes('emailFormat') &&
                field.errors.push('emailFormat');
            }

            break;
          case /minLength*/.test(validator): {
            const charLimit = validator.split('_')[1];
            if (!minLengthValidator(field.value, charLimit)) {
              isValid = false;
              !field.errors.includes(`shouldBeAtLeast${charLimit}CharLong`) &&
                field.errors.push(`shouldBeAtLeast${charLimit}CharLong`);
            }
            break;
          }
          case /shouldBeTrue/.test(validator):
            if (!field.value) {
              isValid = false;
              !field.errors.includes('shouldBeTrue') &&
                field.errors.push('shouldBeTrue');
            }
            break;
          case /shouldMatch*/.test(validator): {
            const toMatch = validator.split('_')[1];
            if (fields[toMatch] && field.value !== fields[toMatch].value) {
              isValid = false;

              !field.errors.includes(
                `shouldMatch${toMatch[0].toUpperCase() + toMatch.slice(1)}`,
              ) &&
                field.errors.push(
                  `shouldMatch${toMatch[0].toUpperCase() + toMatch.slice(1)}`,
                );
            }
            break;
          }
          case /required/.test(validator): {
            if (!requiredValidator(field.value)) {
              isValid = false;
              !field.errors.includes('required') &&
                field.errors.push('required');
            }
            break;
          }
          default:
        }
      });
  });
  return isValid;
}
