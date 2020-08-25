import React from "react";
import ProductForm from "../Form/ProductForm";

import { Redirect } from "react-router-dom";
import { postApi } from "../../../bin/callApi";

import "./CreateProduct.css";

const CreateProduct = () => {
  const handleClick = (e, product) => {
    postApi("products", product).then((res) => (
      <Redirect to="/products/show" />
    ));
  };

  const productOptions = {
    type: "",
    code: "",
    name: "",
    photoURL: "",
    stock: 0,
    psv: 0,
    dimensions: { height: 0, length: 0, width: 0 },
    weight: 0,
  };

  return (
    <div className="container">
      <ProductForm
        click={handleClick}
        actionType={"Cadastrar"}
        options={{ selectDefault: "default", product: productOptions }}
      />
    </div>
  );
};

export default CreateProduct;
