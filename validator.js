const bodyProps = (data) => {
  const compulsoryProps = ["name", "age", "hobbies"];
  let flag = true;
  compulsoryProps.forEach((e) => {
    if (data[e] === undefined) {
      flag = false;
    }
  });

  return flag;
};

module.exports = {
  bodyProps,
};
