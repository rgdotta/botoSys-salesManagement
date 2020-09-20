import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import OrderFormItem from "./OrderFormItem.js";

import { Form, Button, Tabs } from "antd";
import "../../../../css/Form.css";

const OrderForm = ({ click, actionType, options }) => {
  const [order, setOrder] = useState(options.order);
  const [error, setError] = useState({});

  const history = useHistory();

  const handleChange = (name, value, parentName) => {
    //create
    if (parentName === "dimensions") {
      setOrder((prev) => {
        return {
          ...prev,
          dimensions: {
            ...prev.dimensions,
            [name]: value,
          },
        };
      });
    } else if (parentName === "code") {
      let newCode = [...order.code];
      newCode[name] = value;

      setOrder((prev) => {
        return {
          ...prev,
          code: newCode,
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

  return (
    <div className="formContainer">
      <Form className="form" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        <div className="formTitle">
          <h1>{actionType} Venda</h1>
        </div>
        <p>{order.orderNum}</p>
        {/* {Object.entries(order).map((property, index) => {
          return (
            <OrderFormItem
              key={index}
              property={property}
              change={handleChange}
              error={error}
              def={options.selectDefault}
            />
          );
        })} */}

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
