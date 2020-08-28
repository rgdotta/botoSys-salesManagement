import React, { useState, useEffect } from "react";

import { getApi, deleteApi } from "../../../bin/callApi";
import { useHistory } from "react-router-dom";

import { Card, Collapse, Button, Popconfirm, List } from "antd";
import "./ShowProducts.css";

const ShowProducts = () => {
  const [products, setProducts] = useState();

  const history = useHistory();

  const handleDelete = (toDelete, index) => {
    const prevProducts = [...products];

    deleteApi("products", {
      id: toDelete,
    });

    prevProducts.splice(index, 1);

    setProducts(prevProducts);
    console.log(products);
  };

  console.log(products);

  useEffect(() => {
    getApi("products").then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <Collapse className="collapser">
        {products &&
          products.map((product, index) => {
            return (
              <Collapse.Panel header={product.name} key={product._id}>
                <div className="cardContainer">
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
                    <List bordered>
                      <List.Item>
                        <List.Item.Meta
                          className="listItem"
                          title="CÓDIGO"
                          description={product.code}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          className="listItem"
                          title="TIPO"
                          description={product.type}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          className="listItem"
                          title="Estoque"
                          description={product.stock + " unidades"}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          className="listItem"
                          title="PREÇO"
                          description={"R$ " + product.psv.$numberDecimal}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          className="listItem"
                          title="DIMENSÕES (CM)"
                          description={
                            product.dimensions.height +
                            " Altura x " +
                            product.dimensions.length +
                            " Comprimento x " +
                            product.dimensions.width +
                            " Largura"
                          }
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          className="listItem"
                          title="PESO"
                          description={product.weight.$numberDecimal + " KG"}
                        />
                      </List.Item>
                      <List.Item className="btnShowContainer">
                        <Button
                          className="cardBtn"
                          size="large"
                          primary
                          onClick={() =>
                            history.push(
                              "/products/edit/" + product._id,
                              product
                            )
                          }
                        >
                          Editar
                        </Button>
                        <Popconfirm
                          title="Você tem certeza que quer deletar esse produto?"
                          okText="Sim"
                          cancelText="Não"
                          onConfirm={() => handleDelete(product._id, index)}
                        >
                          <Button className="cardBtn" size="large" danger>
                            Deletar
                          </Button>
                        </Popconfirm>
                      </List.Item>
                    </List>
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
