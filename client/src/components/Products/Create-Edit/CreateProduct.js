import React from "react";

import { fetchApi } from "../../../bin/callApi";

import ProductForm from "./Form/ProductForm";

import "./Product.css";

const CreateProduct = () => {
  const handleClick = (product) => {
    fetchApi("POST", "products", product);
  };

  const productOptions = {
    type: "",
    code: [],
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
