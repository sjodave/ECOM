import React from "react";
import Product from "../components/Product.component";
import { useFetchProductsQuery } from "../utils/store";

function Dashboard() {
  const { data, error, isFetching } = useFetchProductsQuery();
  let content;
  if (isFetching) {
  } else if (error) {
    content = <div>{error}</div>;
  } else if (data) {
    content = data.products.map((product) => {
      return <Product key={product.id} product={product}></Product>;
    });
  }

  return <div className="flex gap-6 flex-wrap mt-5 margin-left">{content}</div>;
}

export default Dashboard;
