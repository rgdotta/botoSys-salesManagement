import React, { useState, useEffect } from "react";

import { getApi } from "../../../bin/callApi";
import { Link } from "react-router-dom";

import { Table } from "antd";

const OrderList = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getApi("orders/findToList").then((data) =>
      setTableData([
        data.forEach((client) => {
          return {
            orderNum: (
              <Link to={"/vendas/consultar/" + client.orderNum}>
                {client.orderNum}
              </Link>
            ),
            clientName: client.client.name,
          };
        }),
      ])
    );
  }, []);

  const columns = [
    {
      title: "Número",
      dataIndex: "orderNum",
      key: "orderNum",
    },
    {
      title: "Nome",
      dataIndex: "clientName",
      key: "clientName",
    },
  ];
  return (
    <div>
      <Table className="orderTable" columns={columns} dataSource={tableData} />
    </div>
  );
};

export default OrderList;
