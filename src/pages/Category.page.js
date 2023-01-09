import React, { useState } from "react";
import ProductCard from "../components/Product.component";
import { useFetchCategoryQuery } from "../utils/store/api/categoryApi";
import SkelProductList from "./Skeleton/SkelProductList";

export default function Category() {
  const [category, setCategory] = useState("smartphones");
  const { data, isFetching, error } = useFetchCategoryQuery(category);
  const categoryList = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];
  if (isFetching) return <SkelProductList />;
  const renderCategoryList = categoryList.map((e) => {
    return (
      <div
        key={e}
        className="border-slate-700 border  p-3 	rounded inline-block hover:bg-slate-700 hover:text-white"
        onClick={(e) => setCategory(e.target.innerText)}
      >
        {e}
      </div>
    );
  });
  const content = data.products?.map((product) => {
    return <ProductCard key={product.id} product={product}></ProductCard>;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-1 ">{renderCategoryList}</div>
      <div className="flex flex-wrap mt-4 gap-4">{content}</div>
    </div>
  );
}
