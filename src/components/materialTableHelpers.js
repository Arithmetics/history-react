export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function getNestedObject(nestedObj, pathArr) {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
}

export function createLookup(data, fields) {
  return (
    data
      .map((row) => getNestedObject(row, fields))
      .filter(onlyUnique)
      // eslint-disable-next-line
      .reduce((a, b) => ((a[b] = b), a), {})
  );
}

export function filterBetween(term, rowData, rowDataFields) {
  const sortingField = getNestedObject(rowData, rowDataFields);
  const numbers = term.replace(/\s+/g, "").split("-");
  if (numbers.length !== 2) return false;
  const low = numbers[0];
  const high = numbers[1];
  return low <= sortingField && high >= sortingField;
}
