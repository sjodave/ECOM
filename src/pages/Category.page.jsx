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
  if (error) return <h3>Error fetching Data</h3>;
  const renderCategoryList = categoryList.map((e) => {
    return (
      <li
        key={e}
        className={`inline-block rounded  border 	border-slate-700 p-3 hover:bg-slate-700 hover:text-white ${
          category === e ? "bg-slate-700 text-white" : ""
        }`}
        onClick={(e) => setCategory(e.target.innerText)}
        data-testid={e}
      >
        {e}
      </li>
    );
  });
  const content = data.products?.map((product) => {
    return (
      <div data-testid="filterd">
        <ProductCard key={product.id} product={product}></ProductCard>
      </div>
    );
  });

  return (
    <div>
      <ul className="flex flex-wrap gap-1 ">{renderCategoryList}</ul>
      <ul className="mt-4 flex flex-wrap gap-4">{content}</ul>
    </div>
  );
}
