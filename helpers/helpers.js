const createId = () => {
  const id = Math.random().toString(36).slice(2);
  return id;
}

module.exports = {
  createId
}
