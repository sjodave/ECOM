import React from "react";
import { useSearchProductQuery } from "../utils/store";
import SkelProductList from "./Skeleton/SkelProductList";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Product.component";

export default function SearchProducts() {
  const { id } = useParams();
  const { data, isFetching } = useSearchProductQuery(id);
  if (isFetching) return <SkelProductList />;
  let content = (
    <div>No result found for your search. Try searching for other items</div>
  );
  console.log(
    "🚀 ~ file: SearchProducts.page.jsx:23 ~ SearchProducts ~ data",
    data
  );
  if (data?.products.length) {
    content = data.products.map((e) => {
      return <ProductCard product={e} key={e.title} />;
    });
  }

  return <ul className="flex flex-wrap gap-5 justify-evenly">{content}</ul>;
}
