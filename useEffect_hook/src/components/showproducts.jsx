import React from "react";

function ApiExa({ Product }) {
  return (
    <tr>
      <td>{Product.id}</td>
      <td>
        <img src={Product.image} alt={Product.title} style={{ width: "50px" }} />
      </td>
      <td>{Product.title}</td>
      <td>{Product.price} Rs</td>
      <td>{Product.category}</td>
    </tr>
  );
}

export default ApiExa;