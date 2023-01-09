export default function isObjectInArray(arr, id) {
  return arr.find((item) => item.id === +id);
}
