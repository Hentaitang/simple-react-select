const sort = require('./sort');
const arr = [5, 4, 3, 2, 1];
test('排序数组[5,2,4,3,1]', () => {
  expect(sort(arr)).toEqual([1, 2, 3, 4, 5]);
});
