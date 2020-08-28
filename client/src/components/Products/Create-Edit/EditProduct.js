import React from "react";
import ProductForm from "../Form/ProductForm";

import { patchApi } from "../../../bin/callApi";

import "./Product.css";

const EditProduct = (props) => {
  const toEdit = props.location.state;
  toEdit["psv"] = toEdit.psv.$numberDecimal;
  toEdit["weight"] = toEdit.weight.$numberDecimal;

  const handleClick = (product) => {
    const newProduct = { id: toEdit._id, ...product };
    patchApi("products", newProduct);
  };

  return (
    <div className="container">
      <ProductForm
        click={handleClick}
        actionType={"Editar"}
        options={{ selectDefault: toEdit.type, product: toEdit }}
      />
    </div>
  );
};

export default EditProduct;
