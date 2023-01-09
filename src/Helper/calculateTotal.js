export default function calculateTotal(arr, objKey) {
  return arr.reduce((a, b) => a + b[objKey], 0);
}
