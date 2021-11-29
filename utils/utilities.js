const isNullOrUndefined = data => {
  return data === null || data === undefined;
};

const isEmptyOrNullObject = data => {
  for (var key in data) {
    return false;
  }
  return true;
};

const isEmptyOrInvalidString = value => {
  return (
    value === null || value === undefined || value.split(/\s+/).join("") === ""
  );
};

module.exports = {
  isNullOrUndefined,
  isEmptyOrNullObject,
  isEmptyOrInvalidString
};
