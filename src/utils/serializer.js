function unsafeDeserialize(serialized) {
  return eval('(' + serialized + ')');
}

module.exports = {
  unsafeDeserialize
};