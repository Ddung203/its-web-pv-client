const resetObject = (object) => {
  Object.keys(object).forEach((key) => {
    object[key] = "";
  });
};

export default resetObject;
