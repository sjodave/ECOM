import { nanoid } from "@reduxjs/toolkit";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";

export default function RatingStars({ rating }) {
  rating = Math.round(rating * 2) / 2;
  let output = [];
  for (var i = rating; i >= 1; i--) output.push(<BsStarFill />);
  if (i === 0.5) output.push(<BsStarHalf />);
  for (let i = 5 - rating; i >= 1; i--) output.push(<BsStar />);

  return (
    <span className="flex items-center">
      {output.map((e) => (
        <span key={nanoid()}>{e}</span>
      ))}
    </span>
  );
}
