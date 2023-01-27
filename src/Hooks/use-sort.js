import { useState } from "react";

export default function useSort(data) {
  const [sortby, setSortBy] = useState(null);
  let sortedData = data?.products;

  const sortValue = (x) => {
    return x[sortby[0]];
  };
  if (sortby && data) {
    sortedData = [...data.products].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortby[1] === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return { sortedData, setSortBy };
}
