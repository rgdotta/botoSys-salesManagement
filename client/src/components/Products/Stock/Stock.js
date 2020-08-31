import React, { useState, useEffect } from "react";

import "./Stock.css";

import { getApi } from "../../../bin/callApi";

import { List, Card, Table } from "antd";

const Stock = () => {
  const [cockpit, setCockpit] = useState([]);
  const [tvSuport, setTvSuport] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [steringWheel, setSteringWheel] = useState([]);
  const [other, setOther] = useState([]);

  //get products from api
  useEffect(() => {
    getApi("products").then((data) => {
      data.map((product) => {
        if (product.type === "Cockpit") {
          setCockpit((prev) => [...prev, product]);
        } else if (product.type === "Suporte de TV") {
          setTvSuport((prev) => [...prev, product]);
        } else if (product.type === "Acessório") {
          setAccessory((prev) => [...prev, product]);
        } else if (product.type === "Volante") {
          setSteringWheel((prev) => [...prev, product]);
        } else if (product.type === "Outros") {
          setOther((prev) => [...prev, product]);
        }
      });
    });
  }, []);

  //split products by type

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Quantidade", dataIndex: "stock", key: "stock" },
  ];

  console.log(cockpit);

  return (
    <div className="stockContainer">
      <p className="label">COCKPITS</p>
      <Table
        columns={columns}
        dataSource={cockpit}
        pagination={false}
        className="list"
      />

      <p className="label">SUPORTE DE TV</p>
      <Table
        columns={columns}
        dataSource={tvSuport}
        pagination={false}
        className="list"
      />

      <p className="label">ACESSÓRIOS</p>
      <Table
        columns={columns}
        dataSource={accessory}
        pagination={false}
        className="list"
      />

      <p className="label">VOLANTES</p>
      <Table
        columns={columns}
        dataSource={steringWheel}
        pagination={false}
        className="list"
      />

      <p className="label">OUTROS</p>
      <Table
        columns={columns}
        dataSource={other}
        pagination={false}
        className="list"
      />
    </div>
  );
};

export default Stock;
