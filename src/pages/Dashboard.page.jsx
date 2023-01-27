import React, { useEffect } from "react";
import Product from "../components/Product.component";
import useSort from "../Hooks/use-sort";
import { useFetchProductsQuery } from "../utils/store";
import SkelProductList from "./Skeleton/SkelProductList";

function Dashboard() {
  const { data, error, isFetching, refetch } = useFetchProductsQuery();
  const { sortedData, setSortBy } = useSort(data);

  let content;
  if (isFetching) {
    return <SkelProductList />;
  } else if (error) {
    content = <div>Error fetching data</div>;
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
        <option value={""}>Sort By</option>
        <option value={["price", "asc"]}>Price low to high</option>
        <option value={["discountPercentage", "decs"]}>Discount</option>
        <option value={["rating", "decs"]}>Rating</option>
        <option value={["price", "decs"]}>Price high to low</option>
      </select>
      <ul className="flex justify-evenly  gap-6 flex-wrap mt-5 margin-left">
        {content}
      </ul>
    </div>
  );
}

export default Dashboard;
