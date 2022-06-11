const applySuitableValidators = (props) => {
  const validators = {};

  if (
    props.id !== "image" &&
    !props.validateConfirmPassword &&
    !props.validatePasswordMsg
  ) {
    validators.validate = (value) =>
      value === value.trim() ||
      `Please enter valid ${props.id}. Without spaces in front and at the end of ${props.id}`;
  }

  if (props.requiredMsg) {
    validators.required = props.requiredMsg;
  }

  if (props.minLength) {
    validators.required = props.minLengthMsg;

    validators.minLength = {
      value: props.minLength,
      message: props.minLengthMsg,
    };
  }

  if (props.validateEmail) {
    validators.pattern = {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: props.validateEmail,
    };
    validators.required = props.validateEmail;
  }

  if (props.validatePassword) {
    validators.required = props.validatePassword;
    validators.pattern = {
      value:
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      message: props.validatePassword,
    };
  }

  if (props.validateConfirmPassword) {
    validators.required = props.validateConfirmPassword;
    validators.validate = {
      validator: (value) =>
        value === props.getValues("password") || props.validateConfirmPassword,
    };
  }
  return validators;
};

export default applySuitableValidators;
