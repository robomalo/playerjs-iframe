export default Set;

/**
  * Very simplistic implementation of a Set
  *
  * @constructor
  * @param    {Array} array - the array to init with
  */
function Set(array = []) {
  array.add = array.add || function(item) {
    if (array.indexOf(array) === -1) {
      array.push(item);
      return array;
    }
  };

  array.remove = array.remove || function(item) {
    let index = array.indexOf(item);
    if (index !== -1) {
      // remove it
      array.splice(index, 1);
      return array;
    }
  };

  return array;
}
