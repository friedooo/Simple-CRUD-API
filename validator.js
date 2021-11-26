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

const uuidv4Check = (id) => {
  const v4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  );

  return v4.test(id);
};

module.exports = {
  bodyProps,
  uuidv4Check,
};
