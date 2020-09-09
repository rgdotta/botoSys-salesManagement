import React, { useState, useEffect } from "react";

import { getApi, fetchApi } from "../../../bin/callApi";
import { useHistory } from "react-router-dom";

import { Card, Collapse, Button, Popconfirm, List, Select } from "antd";
import "./ShowProducts.css";

const ShowProducts = () => {
  const [products, setProducts] = useState();
  const [filteredProducts, setFilter] = useState();

  const history = useHistory();

  //filter products by type
  const handleFilter = (value) => {
    console.log(value);

    if (value === "Todos") {
      setFilter(products);
    } else {
      const filtered = products.filter((product) => product.type === value);

      setFilter(filtered);
    }
  };

  //delete product
  const handleDelete = (toDelete, index) => {
    const prevProducts = [...products];

    fetchApi("DELETE", "products", {
      id: toDelete,
    });

    prevProducts.splice(index, 1);

    setProducts(prevProducts);

    const deleteFromFilter = filteredProducts.filter((product) => {
      return product._id !== toDelete;
    });

    setFilter(deleteFromFilter);
    console.log(products);
  };

  //get products from api
  useEffect(() => {
    getApi("products").then((data) => {
      setProducts(data);
      setFilter(data);
    });
  }, []);

  return (
    <div>
      <div className="filterContainer">
        <p>Filtrar por:</p>
        <Select
          id="filter"
          name="filter"
          defaultValue="Todos"
          style={{ width: 150 }}
          onChange={(value) => handleFilter(value)}
        >
          <Select.Option value="Todos">Todos</Select.Option>
          <Select.Option value="Cockpit">Cockpit</Select.Option>
          <Select.Option value="Suporte de TV">Suporte de TV</Select.Option>
          <Select.Option value="Acessório">Acessório</Select.Option>
          <Select.Option value="Volante">Volante</Select.Option>
          <Select.Option value="Banco">Banco</Select.Option>
          <Select.Option value="Outros">Outros</Select.Option>
        </Select>
      </div>

      <Collapse className="collapser">
        {filteredProducts &&
          filteredProducts.map((product, index) => {
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
                    <List>
                      <List.Item>
                        {product.type === "Cockpit" ? (
                          <List.Item.Meta
                            title="CÓDIGO"
                            description={
                              <div style={{ width: "100%" }}>
                                <Card.Grid
                                  hoverable={false}
                                  style={{ boxShadow: "none" }}
                                >
                                  SPEC: <br />
                                  {product.code[0]}
                                </Card.Grid>
                                <Card.Grid
                                  hoverable={false}
                                  style={{ boxShadow: "none" }}
                                >
                                  SPEC I: <br />
                                  {product.code[1]}
                                </Card.Grid>
                                <Card.Grid
                                  hoverable={false}
                                  style={{ boxShadow: "none" }}
                                >
                                  SPEC II: <br /> {product.code[2]}
                                </Card.Grid>
                              </div>
                            }
                          />
                        ) : (
                          <List.Item.Meta
                            className="listItem"
                            title="CÓDIGO"
                            description={product.code[0]}
                          />
                        )}
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
                          title="ESTOQUE"
                          description={
                            product.stock +
                            (product.stock === 1 ? " unidade" : " unidades")
                          }
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          className="listItem"
                          title="PREÇO"
                          description={new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.psv.$numberDecimal)}
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
                          type="link"
                          size="large"
                          onClick={() =>
                            history.push(
                              "/produtos/editar/" + product._id,
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
                          <Button
                            type="link"
                            className="cardBtn"
                            size="large"
                            danger
                          >
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
