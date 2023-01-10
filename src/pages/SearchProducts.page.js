import React from "react";
import { useSearchProductQuery } from "../utils/store";
import SkelProductList from "./Skeleton/SkelProductList";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Product.component";

export default function SearchProducts() {
  const { id } = useParams();
  const { data, isFetching } = useSearchProductQuery(id);
  if (isFetching) return <SkelProductList />;
  console.log(data);
  let content = (
    <div>No result found for your search. Try searching for other items</div>
  );
  if (data?.products.length) {
    content = data.products.map((e) => {
      return <ProductCard product={e} />;
    });
  }

  return <div className="flex flex-wrap gap-5 justify-evenly">{content}</div>;
}
