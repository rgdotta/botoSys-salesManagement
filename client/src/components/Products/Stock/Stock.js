import React, { useState, useEffect } from "react";

import { getApi } from "../../../bin/callApi";

import { Table } from "antd";
import "./Stock.css";

const Stock = () => {
  const [products, setProducts] = useState();

  //table order
  const order = [
    "COCKPITS",
    "SUPORTE DE TV",
    "ACESSÓRIOS",
    "VOLANTES",
    "OUTROS",
  ];

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
