import React, { useState, useEffect } from "react";

import { getApi } from "../../../../bin/callApi";
import NumberFormat from "react-number-format";

import OrderFormItem from "./OrderFormItem";

import { Table, Select, Button, Form, InputNumber } from "antd";
import CloseOutlined from "@ant-design/icons";

import "../Order.css";

const OrderTable = ({ order, change }) => {
  const [product, setProduct] = useState();
  const [productList, setProductList] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tableSource, setTableSource] = useState([]);
  const [val, setVal] = useState({ totalVal: 0, discount: 0, finalVal: 0 });

  const handleChange = (value) => {
    const prod = productList.filter((product) => {
      return value === product._id;
    });

    setProduct(prod[0]);
  };

  const handleClick = () => {
    if (product) {
      const index = selectedProducts.length;
      const selected = [...selectedProducts, product];
      const ids = selected.map((product) => {
        return product._id;
      });

      setSelectedProducts(selected);
      change("products", ids);

      const source = [
        ...tableSource,
        {
          key: index,
          name: product.name,
          code: product.code.join(", "),
          psv: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.psv.$numberDecimal),
          delete: <button></button>,
        },
      ];

      setTableSource(source);

      let sumVal = selected
        .map((product) => {
          console.log(product["psv"]);
          return parseFloat(product["psv"]["$numberDecimal"]);
        })
        .reduce((a, b) => a + b, 0);

      let sumFinal = sumVal - (sumVal * val.discount) / 100;

      setVal((prev) => {
        return { ...prev, totalVal: sumVal, finalVal: sumVal };
      });
      change("totalValue", sumVal);
      change("finalValue", sumFinal);
    }
  };

  useEffect(() => {
    getApi("products").then((data) => setProductList(data));
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "PSV",
      dataIndex: "psv",
      key: "psv",
    },
    { title: "Deletar", dataIndex: "delete", key: "delete" },
  ];

  return (
    <div>
      <Form.Item>
        <div className="selectionContainer">
          <Select
            style={{ width: "250px" }}
            defaultValue="default"
            id="Select2"
            onChange={(value) => handleChange(value)}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option disabled value="default">
              Selecione o produto
            </Select.Option>
            {productList &&
              productList.map((product, index) => {
                return (
                  <Select.Option key={index} value={product._id}>
                    {product.name}
                  </Select.Option>
                );
              })}
          </Select>
          <Button
            className="btn"
            size="default"
            type="primary"
            onClick={handleClick}
          >
            Adicionar
          </Button>
        </div>
      </Form.Item>

      <div className="orderTableContainer">
        <Table
          className="orderTable"
          columns={columns}
          dataSource={tableSource}
        />
      </div>

      <Form.Item className="finalValue" label="Valor Total">
        <input
          readOnly
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(val.totalVal)}
        />
      </Form.Item>

      <Form.Item
        label="Desconto"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <InputNumber
          max={100}
          min={0}
          value={val.discount}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          onChange={(value) => {
            setVal((prev) => {
              return { ...prev, discount: value };
            });

            change("discount", value);

            const sumFinal = val.totalVal - (val.totalVal * value) / 100;

            setVal((prev) => {
              return { ...prev, finalVal: sumFinal };
            });

            change("finalValue", sumFinal);
          }}
        />
      </Form.Item>

      {/* <Form.Item label="Valor Final">
        <input
          readOnly
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value)}
        />
      </Form.Item> */}
    </div>
  );
};

export default OrderTable;
