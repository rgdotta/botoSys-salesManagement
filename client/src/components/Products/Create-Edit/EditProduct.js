import React from "react";
import ProductForm from "./Form/ProductForm";

import { patchApi } from "../../../bin/callApi";

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
    const newProduct = { id: toEdit._id, ...product };
    patchApi("products", newProduct);
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
