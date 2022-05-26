export const displayVuelidateError = (errors, fieldName) => {
  if (errors.length <= 0) {
    return;
  }

  return errors[0].$message.replace("Value", fieldName);
};
