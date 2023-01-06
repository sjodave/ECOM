import React from "react";
import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const navigate = useNavigate();
  const { id, thumbnail, title } = product;
  return (
    <div
      className=""
      style={{ width: "200px" }}
      onClick={() => navigate(`/products/${id}`)}
    >
      <img
        src={thumbnail}
        alt={title}
        style={{ height: "200px", width: "200px" }}
      />
      <div>{title}</div>
    </div>
  );
}
