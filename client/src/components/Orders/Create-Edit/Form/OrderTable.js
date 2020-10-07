import React, { useState, useEffect } from "react";

import { getApi } from "../../../../bin/callApi";
import NumberFormat from "react-number-format";

import { Table, Select, Button, Form, InputNumber } from "antd";

import "../Order.css";

const OrderTable = ({ order, change, error }) => {
  //current selected product
  const [product, setProduct] = useState();
  //product list that will be chosen in the selection
  const [productList, setProductList] = useState();
  //current selected product list
  const [selectedProducts, setSelectedProducts] = useState([]);
  //source for the table
  const [tableSource, setTableSource] = useState([]);
  //total = total value without aditionals or discount, totalVal = total value of the order, finalVal = total value after discount
  const [val, setVal] = useState({
    total: 0,
    totalVal: 0,
    discount: 0,
    finalVal: 0,
  });
  const [aditional, setAditional] = useState({ install: 0, others: 0 });

  //set the products ids that will be sent to the db for population
  const handleChange = (value) => {
    const prod = productList.filter((product) => {
      return value === product._id;
    });

    setProduct(prod[0]);
  };

  //change the price
  const handlePrice = (value, source, other) => {
    if (value !== undefined) {
      let sumFinal;

      if (source === "install" || source === "others") {
        let input = 0;

        if (parseFloat(value) > 0) {
          input = parseFloat(value);
        }

        //sum the total value with the aditional value and set the new total value and value after discount
        const sumVal = input + aditional[other];
        const sum = val.total + sumVal;

        sumFinal = sum - (sum * val.discount) / 100;

        //change both values in state and parent component state
        setVal((prev) => {
          return { ...prev, totalVal: sum };
        });

        setAditional((prev) => {
          return { ...prev, [source]: value };
        });

        change("totalValue", sum);
        change(source, value, "aditionalValue");
      } else {
        setVal((prev) => {
          return { ...prev, discount: value };
        });

        change("discount", value);

        //set new final value after discount
        sumFinal = val.totalVal - (val.totalVal * value) / 100;
      }

      setVal((prev) => {
        return { ...prev, finalVal: sumFinal };
      });

      change("finalValue", sumFinal);
    }
  };

  //this function calculate the nem value with and without discount and send them to parent component state
  const calcVal = (selected) => {
    let sumVal = selected
      .map((product) => {
        console.log(product["psv"]);
        return parseFloat(product["psv"]["$numberDecimal"]);
      })
      .reduce((a, b) => a + b, 0);

    let sumTotal = sumVal + aditional.install + aditional.others;

    let sumFinal = sumVal - (sumVal * val.discount) / 100;

    setVal((prev) => {
      return { ...prev, totalVal: sumTotal, finalVal: sumVal, total: sumVal };
    });

    change("totalValue", sumVal);
    change("finalValue", sumFinal);
  };

  const handleClick = () => {
    if (product) {
      const index = selectedProducts.length;
      const selected = [...selectedProducts, product];

      selected.forEach((e) => {
        ["dimensions", "stock", "photoURL", "weight"].forEach(
          (d) => delete e[d]
        );
      });
      //select the products and the function that sends then to the parent component state
      setSelectedProducts(selected);
      change("products", selected);

      //source for the table
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
        },
      ];

      setTableSource(source);

      //set total value of the order and value after discount
      calcVal(selected);
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
  ];

  const selectOpt = {
    type: [
      "Depósito",
      "Débito",
      "Crédito",
      "Dinheiro",
      "Transferência",
      "Boleto",
    ],
    times: ["À Vista", "À Prazo", "Até 3x", "Até 10x"],
  };

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
        {error.product && (
          <p style={{ textAlign: "center" }} className="errorTest">
            {error.product}
          </p>
        )}
      </Form.Item>

      <div className="orderTableContainer">
        <Table
          className="orderTable"
          columns={columns}
          dataSource={tableSource}
        />
        <div style={{ width: "100%", textAlign: "end", marginBottom: "20px" }}>
          <Button
            style={{ margin: "auto auto auto 0" }}
            className="btn"
            size="default"
            type="danger"
            onClick={() => {
              const tableFiltered = [...tableSource];
              tableFiltered.pop();

              setTableSource(tableFiltered);

              const selectedFiltered = [...selectedProducts];
              selectedFiltered.pop();

              setSelectedProducts(selectedFiltered);
              change("products", selectedFiltered);

              calcVal(selectedFiltered);
            }}
          >
            Deletar último
          </Button>
        </div>
      </div>

      <Form.Item
        label="Instalação"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <NumberFormat
          className="formaterInput"
          thousandSeparator="."
          prefix={"R$"}
          decimalScale={2}
          decimalSeparator=","
          min={0}
          value={aditional.install}
          onValueChange={(value) =>
            handlePrice(value.floatValue, "install", "others")
          }
        />
      </Form.Item>

      <Form.Item
        label="Outros Valores"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <NumberFormat
          className="formaterInput"
          thousandSeparator="."
          prefix={"R$"}
          decimalScale={2}
          decimalSeparator=","
          value={aditional.others}
          onValueChange={(value) =>
            handlePrice(value.floatValue, "others", "install")
          }
        />
      </Form.Item>

      <hr />

      <Form.Item className="totalValue" label="Valor Total">
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
          onChange={(value) => handlePrice(value)}
        />
      </Form.Item>

      <Form.Item label="Valor Final">
        <input
          readOnly
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(val.finalVal)}
        />
      </Form.Item>

      <hr />

      <Form.Item label="Forma de Pagamento">
        <Select
          style={{ width: "250px" }}
          defaultValue="default"
          id="Select2"
          onChange={(value) => change("opt", value, "paymentOptions")}
        >
          <Select.Option disabled value="default">
            Selecione
          </Select.Option>
          {selectOpt["type"].map((select) => {
            return (
              <Select.Option key={select} value={select}>
                {select}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Parcelas">
        <Select
          style={{ width: "250px" }}
          defaultValue="default"
          id="Select2"
          onChange={(value) => change("times", value, "paymentOptions")}
        >
          <Select.Option disabled value="default">
            Selecione
          </Select.Option>
          {selectOpt["times"].map((select) => {
            return (
              <Select.Option key={select} value={select}>
                {select}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </div>
  );
};

export default OrderTable;
