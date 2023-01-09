export default function priceAfterDiscount(productPrice, discountPercentage) {
  return ((productPrice * (100 - discountPercentage)) / 100).toFixed(0);
}
