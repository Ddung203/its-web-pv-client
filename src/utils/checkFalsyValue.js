const checkFalsy = (object) => {
  return Object.values(object).some((value) => !value);
};

export default checkFalsy;
