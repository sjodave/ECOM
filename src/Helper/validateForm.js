const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function isEmailAddress(str = "invalid") {
  return str.match(pattern);
}

export const validateForm = (formValues) => {
  const errors = {};
  if (formValues.phone?.length !== 10) {
    errors.phone = "phone number should be of 10 digits";
  }
  if (formValues.firstName?.length < 3 || !formValues.firstName) {
    errors["firstName"] = "Name should be atleast 3 chars";
  }
  if (formValues.password?.length < 6 || formValues.password?.length > 30) {
    errors["password"] =
      "Password should be atleast 6 chars and less than 30 chars";
  }

  if (formValues["confirm-password"] !== formValues["password"]) {
    errors["confirm-password"] = "Password Does not match";
  }
  if (!formValues.email) {
    errors["email"] = "Mandetory";
  }

  if (formValues.email && isEmailAddress(formValues.email) === null) {
    errors["email"] = "Not a valid email";
  }
  return errors;
};
