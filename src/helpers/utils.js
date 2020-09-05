const responseToArray = (response) => {
  const objects = response;
  const array = [];
  if (objects) {
    Object.keys(objects).forEach((Id) => {
      objects[Id].id = Id;
      array.push(objects[Id]);
    });
  }
  return array;
};

export default { responseToArray };
