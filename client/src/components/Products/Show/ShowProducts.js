import React, { useState, useEffect } from "react";

import { getApi } from "../../../bin/callApi";

import "./ShowProducts.css";

const ShowProducts = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    getApi("products").then((data) => setProducts(data));
  }, []);

  return (
    <div>
      {products &&
        products.map((product) => {
          return (
            <div key={product._id}>
              <p>{product._id}</p>
              <p>{product.type}</p>
              <p>{product.code}</p>
              <p>{product.name}</p>
              <p>{product.photoURL}</p>
              <p>{product.stock}</p>
              <p>{product.psv.$numberDecimal}</p>
              <p>
                Tamanho: {product.dimensions.height}A x{" "}
                {product.dimensions.length}C x {product.dimensions.width}L cm
              </p>
              <p>Peso: {product.weight.$numberDecimal}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ShowProducts;
