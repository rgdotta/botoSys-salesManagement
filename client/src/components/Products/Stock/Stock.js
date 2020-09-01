import React, { useState, useEffect } from "react";

import "./Stock.css";

import { getApi } from "../../../bin/callApi";

import { Table } from "antd";

const Stock = () => {
  const [products, setProducts] = useState();

  //get products from api and split it by type
  useEffect(() => {
    getApi("products").then((data) => {
      const newProducts = [[], [], [], [], []];
      data.forEach((product) => {
        if (product.type === "Cockpit") {
          newProducts[0].push(product);
        } else if (product.type === "Suporte de TV") {
          newProducts[1].push(product);
        } else if (product.type === "Acessório") {
          newProducts[2].push(product);
        } else if (product.type === "Volante") {
          newProducts[3].push(product);
        } else if (product.type === "Outros") {
          newProducts[4].push(product);
        }
      });
      setProducts(newProducts);
    });
  }, []);

  //table options

  const order = [
    "COCKPITS",
    "SUPORTE DE TV",
    "ACESSÓRIOS",
    "VOLANTES",
    "OUTROS",
  ];

  return (
    <div className="stockContainer">
      {order.map((table, index) => {
        const columns = [
          { title: "Nome", dataIndex: "name", key: "_id" },
          { title: "Quantidade", dataIndex: "stock", key: "_id" },
        ];
        return (
          products && (
            <div key={index}>
              <p className="label">{table}</p>
              <Table
                columns={columns}
                dataSource={products[index]}
                pagination={false}
                className="list"
                rowKey={"_id"}
              />
            </div>
          )
        );
      })}
    </div>
  );
};

export default Stock;