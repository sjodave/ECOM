import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  // const content =auth?.map((e)=><div>e</div>)
  console.log(auth);
  const content = [];
  for (let key in auth) {
    console.log(key);
    content.push(
      <div>
        {key}:{auth[key]}
      </div>
    );
  }
  console.log(content);
  return (
    <div className="margin-left" style={{ overflow: "scroll" }}>
      {content}
    </div>
  );
}
