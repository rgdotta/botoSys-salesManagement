import React from "react";
import ProductForm from "../Form/ProductForm";

import { postApi } from "../../../bin/callApi";

import "./CreateProduct.css";

const CreateProduct = () => {
  const handleClick = (e, product) => {
    postApi("products", product);

    e.preventDefault();
  };

  return <ProductForm click={handleClick} btnName={"Criar"} />;
};

export default CreateProduct;
