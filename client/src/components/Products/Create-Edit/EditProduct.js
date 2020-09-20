import React from "react";

import { fetchApi } from "../../../bin/callApi";

import ProductForm from "./Form/ProductForm";

import "./Product.css";

const EditProduct = (props) => {
  const toEdit = props.location.state;
  toEdit["psv"] = toEdit.psv.$numberDecimal;
  toEdit["weight"] = toEdit.weight.$numberDecimal;

  const productOptions = {
    type: toEdit.type,
    code: toEdit.code,
    name: toEdit.name,
    photoURL: toEdit.photoURL,
    stock: toEdit.stock,
    psv: toEdit.psv.replace(".", ","),
    dimensions: toEdit.dimensions,
    weight: toEdit.weight,
  };

  const handleClick = (product) => {
    if (product["psv"].includes(",")) {
      product["psv"] = parseFloat(product["psv"].replace(",", "."));
    }

    const newProduct = { id: toEdit._id, ...product };
    fetchApi("PUT", "products", newProduct);
  };

  return (
    <div className="container">
      <ProductForm
        click={handleClick}
        actionType={"Editar"}
        options={{ selectDefault: toEdit.type, product: productOptions }}
      />
    </div>
  );
};

export default EditProduct;
