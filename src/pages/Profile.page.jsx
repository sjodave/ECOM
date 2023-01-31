import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  return (
    <ul className="margin-left" style={{ overflow: "scroll" }}>
      <List auth={auth} />
    </ul>
  );
}

function List({ auth }) {
  console.table(auth);
  const content = [];
  for (let property in auth) {
    if (
      typeof auth[property] !== "object" &&
      // !Array.isArray(auth[property]) &&
      property !== "password"
    ) {
      content.push(
        <li>
          {property}:{auth[property]}
        </li>
      );
    } else if (typeof auth[property] == "object" && property !== "password") {
      content.push(
        <ol>
          {property} - {<List className="ml-5" auth={auth[property]} />}
        </ol>
      );
    }
  }
  return content;
}
