import React from "react";
import Skeleton from "../../components/Skeleton.component";
export default function SkelProductList() {
  const content = (
    <div className="flex flex-col">
      <Skeleton times={1} className=" w-44  h-44" />
      <Skeleton times={1} className=" w-40  h-4" />
      <Skeleton times={1} className=" w-32  h-3" />
      <Skeleton times={1} className=" w-40  h-3" />
    </div>
  );
  return (
    <div className="flex flex-wrap gap-4">
      {[1, 2, 3, 4].map((e) => (
        <div key={e}>{content}</div>
      ))}
    </div>
  );
}
