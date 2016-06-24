/**
  * Very simplistic implementation of a Set
  */
export default class Set {
  /**
   * Create a new instance
   * @param {Array} array - the array to init with
   */
  constructor(array = []) {
    array.add = array.add || function (item) {
      if (array.indexOf(item) === -1) {
        array.push(item);

        return array;
      }
    };

    array.remove = array.remove || function (item) {
      let index = array.indexOf(item);

      if (index !== -1) {
        array.splice(index, 1);

        return array;
      }
    };

    return array;
  }
}
