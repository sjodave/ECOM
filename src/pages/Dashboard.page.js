import React, { useState } from "react";
import Product from "../components/Product.component";
import { useFetchProductsQuery } from "../utils/store";
import SkelProductList from "./Skeleton/SkelProductList";

function Dashboard() {
  const [sortby, setSortBy] = useState(null);
  const { data, error, isFetching } = useFetchProductsQuery();
  let sortedData = data?.products;

  const sortValue = (x) => {
    return x[sortby[0]];
  };
  if (sortby) {
    sortedData = [...data?.products].sort((a, b) => {
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

  let content;
  if (isFetching) {
    return <SkelProductList />;
  } else if (error) {
    content = <div>{error}</div>;
  } else if (sortedData) {
    content = sortedData.map((product) => {
      return <Product key={product.id} product={product}></Product>;
    });
  }

  return (
    <div>
      <select
        className=" float-top"
        onChange={(e) => {
          setSortBy(e.target.value.split(","));
        }}
      >
        <option value={null}>Sort By</option>
        <option value={["price", "asc"]}>Price low to high</option>
        <option value={["discountPercentage", "decs"]}>Discount</option>
        <option value={["rating", "decs"]}>Rating</option>
        <option value={["price", "decs"]}>Price high to low</option>
      </select>
      <div className="flex justify-evenly  gap-6 flex-wrap mt-5 margin-left">
        {content}
      </div>
    </div>
  );
}

export default Dashboard;
