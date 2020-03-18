const onlyUnique = (value, index, self) => (self.indexOf(value) === index);

const stringContains = (s1, s2) => s1.toLowerCase().includes(s2.toLowerCase());

const titleCase = (str) => str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

const removeElement = (arr, index) => arr.slice(0, index).concat(arr.slice(index+1));

export {
  onlyUnique,
  stringContains,
  titleCase,
  removeElement,
}
