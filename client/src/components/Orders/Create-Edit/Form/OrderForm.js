import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { getApi } from "../../../../bin/callApi";

import OrderFormItem from "./OrderFormItem.js";
import OrderTable from "./OrderTable";

import { Form, Button, Tabs } from "antd";
import "../../../../css/Form.css";

const { TabPane } = Tabs;

const OrderForm = ({ click, actionType, options }) => {
  const [order, setOrder] = useState(options);
  const [error, setError] = useState({});

  useEffect(() => {
    getApi("orders/findLast").then((data) => {
      setOrder((prev) => {
        return {
          ...prev,
          orderNum: data.length > 0 ? data[0].orderNum + 1 : 1,
        };
      });
    });
  }, []);

  const history = useHistory();

  const handleChange = (name, value, parentName) => {
    //create
    if (parentName === "aditionalPrice" || parentName === "paymentOptions") {
      setOrder((prev) => {
        return {
          ...prev,
          [parentName]: { ...prev[parentName], [name]: value },
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
    // form validation
    let errors = {};
    let valid = true;
    const required = "Campo obrigatório.";

    if (!order["client"]) {
      errors["client"] = required;
      valid = false;
    }

    if (!order["finalValue"]) {
      errors["product"] = "Adicione pelomenos um produto";
      valid = false;
    }

    if (!valid) {
      setError(errors);
    } else {
      click(order);

      // history.push("/vendas/consultar");
    }

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
                      def={"default"}
                    />
                  );
                })}
                {tab.name === "Geral" && (
                  <OrderTable
                    order={order}
                    change={handleChange}
                    error={error}
                  />
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
