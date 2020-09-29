import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import OrderFormItem from "./OrderFormItem.js";
import OrderTable from "./OrderTable";

import { Form, Button, Tabs } from "antd";
import "../../../../css/Form.css";

const { TabPane } = Tabs;

const OrderForm = ({ click, actionType, options }) => {
  const [order, setOrder] = useState(options.order);
  const [error, setError] = useState({});

  const history = useHistory();

  const handleChange = (name, value, parentName) => {
    //create
    if (name === "discount") {
      const sum = order.totalValue;
      const applyDiscount = sum - (sum * value) / 100;

      console.log(sum, value, applyDiscount);

      setOrder((prev) => {
        return {
          ...prev,
          finalValue: applyDiscount,
        };
      });

      setOrder((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else if (parentName === "pricePerProduct") {
      let newValue = [...order[parentName]];
      newValue[name] = value;

      setOrder((prev) => {
        return {
          ...prev,
          [parentName]: newValue,
        };
      });
    } else {
      setOrder((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  console.log(order);

  const submitOrder = (e) => {
    //form validation
    // let errors = {};
    // let valid = true;
    // const required = "Campo obrigatório.";

    // if (!order["type"]) {
    //   errors["type"] = required;
    //   valid = false;
    // }

    // if (!order["code"][0]) {
    //   errors["code"] = required;
    //   valid = false;
    // }

    // if (!order["name"]) {
    //   errors["name"] = required;
    //   valid = false;
    // }

    // if (!order["psv"]) {
    //   errors["psv"] = required;
    //   valid = false;
    // }

    // if (!valid) {
    //   setError(errors);
    // } else {

    click(order);

    history.push("/vendas/consultar");
    // }

    e.preventDefault();
  };

  const selection = [
    {
      name: "Geral",
      opt: ["orderNum", "date", "products", "pricePerProduct", "totalWeight"],
    },
    { name: "Cliente", opt: ["client"] },
    {
      name: "Acabamento",
      opt: ["ledColor", "finishingColor", "seatFabric", "seam"],
    },
    {
      name: "Observação",
      opt: ["observation"],
    },
  ];

  return (
    <div className="formContainer">
      <Form className="form" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        <div className="formTitle">
          <h1>{actionType} Venda</h1>
        </div>
        <Tabs style={{ margin: "15px" }}>
          {selection.map((tab, index) => {
            return (
              <TabPane tab={tab.name} key={index}>
                {Object.entries(order).map((property, index) => {
                  return (
                    <OrderFormItem
                      key={index}
                      selection={tab.opt}
                      property={property}
                      change={handleChange}
                      error={error}
                      def={options.selectDefault}
                    />
                  );
                })}
                {tab.name === "Geral" && (
                  <OrderTable order={order} change={handleChange} />
                )}
              </TabPane>
            );
          })}
        </Tabs>

        <Form.Item className="btnContainer">
          <Button
            className="btn"
            size="large"
            type="primary"
            onClick={submitOrder}
          >
            {actionType}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;
