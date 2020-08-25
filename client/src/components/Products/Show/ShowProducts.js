import React, { useState, useEffect } from "react";

import { getApi } from "../../../bin/callApi";

import { Card, Collapse, Button, Popconfirm } from "antd";
import "./ShowProducts.css";

const ShowProducts = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    getApi("products").then((data) => setProducts(data));
  }, []);
  console.log(products);

  return (
    <div>
      <Collapse className="collapser">
        {products &&
          products.map((product) => {
            return (
              <Collapse.Panel header={product.name}>
                <div key={product._id} className="cardContainer">
                  <Card
                    className="card"
                    cover={
                      <img
                        className="cardImage"
                        alt={product.name}
                        src="https://lh3.googleusercontent.com/cqqjqoH2Y_-Y-iyYy6PosmslP9ea2QLk5RKRVQjIjb64ApY_eo8j9TgB-F8rgD7KjHnBsGRmw9e92GkL7Zke3JegqFIS1b3ZZmLA-FJJWiC0QQD1s7KX79A6glLAPyffVH0NXPXR83JZiENyE6AeNWNc-oJOnTKPFjzF3mHLaN619fgLXuM44tGqnzS5c1u0fH36sFQXIA6bTAOUMsy8Y8LbDixLJznO0wW-y1z38gbzNcFi3tPh3S3uBx63REOQgE9mZflf6FQzbT8hGneb-IrdsrLrJNHYBn7U9kBgWvqANo7gfzwcNJ2q36gaKbP7Kyn_6cF8CAT1jPNCVRETrnZgpBK4GVUzkOfySHjYvQhtgb_8XE5mo2_JzMdqAjulIGt4sXUz9ZWJGynsyjsquVgWVwXY8UUsiZZJvVpda-7sle6kAr-yRdcLO56wVqz5_e9uIFrhRKpUwMfAylsLqqCRc-W4RJXWmBEx0N0wbVsBqU4HgbEtv0gM2W6dIFZq4gBmIBKesfuFNTp61iBKPh3-c3tv-ClMbXQCOgF3oj1Nyr4OkZ8wvCvUxJRsthUzzttwwaXYncEn1Zlrxt6OiAYlrCAvBMej245YYQm6zp7I_Xx2qUbA1XFi0GW0_eMEdDEgHimetOQIKc2B3zQQOZ_yjJg9WgAkViU9Fd_q1PA-pyY3JLXvDe6uoR8Mzw=w572-h762-no?authuser=0"
                      />
                    }
                  >
                    <Card.Grid className="cardGrid">
                      <p className="gridTitle">CÓDIGO:</p>
                      <p className="gridContent">{product.code}</p>
                    </Card.Grid>
                    <Card.Grid className="cardGrid">
                      <p className="gridTitle">TIPO:</p>
                      <p className="gridContent">{product.type}</p>
                    </Card.Grid>
                    <Card.Grid className="cardGrid">
                      <p className="gridTitle">ESTOQUE:</p>
                      <p className="gridContent">{product.stock}</p>
                    </Card.Grid>
                    <Card.Grid className="cardGrid">
                      <p className="gridTitle">PREÇO:</p>
                      <p className="gridContent">
                        R$ {product.psv.$numberDecimal}
                      </p>
                    </Card.Grid>
                    <Card.Grid className="cardGrid">
                      <p className="gridTitle">DIMENÇÕES:</p>
                      <p className="gridContent">
                        {product.dimensions.height}A x{" "}
                        {product.dimensions.length}C x{" "}
                        {product.dimensions.width}L CM
                      </p>
                    </Card.Grid>
                    <Card.Grid className="cardGrid">
                      <p className="gridTitle">PESO:</p>
                      <p className="gridContent">
                        {product.weight.$numberDecimal} KG
                      </p>
                    </Card.Grid>
                    <Card.Grid style={{ width: "100%" }}>
                      <div className="btnShowContainer">
                        <Button className="cardBtn" size="large" type="primary">
                          Editar
                        </Button>
                        <Popconfirm
                          title="Você tem certeza que quer deletar esse produto?"
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button className="cardBtn" size="large" danger>
                            Deletar
                          </Button>
                        </Popconfirm>
                      </div>
                    </Card.Grid>
                  </Card>
                </div>
              </Collapse.Panel>
            );
          })}
      </Collapse>
    </div>
  );
};

export default ShowProducts;
