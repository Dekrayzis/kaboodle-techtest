export const truncateString = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const merge = (arr1, arr2) => {
  const temp = [];

  arr1.forEach(x => {
    arr2.forEach(y => {
      if (x.id === y.id) {
        temp.push({ ...x, ...y })
      }
    })
  })

  return temp;
}

export const removeDuplicates = (array) => {
  let uniq = {};
  return array.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
}
