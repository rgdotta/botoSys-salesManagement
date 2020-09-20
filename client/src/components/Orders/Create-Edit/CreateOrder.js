import React, { useState, useEffect } from "react";

import { getApi, fetchApi } from "../../../bin/callApi";

import OrderForm from "./Form/OrderForm";

import "./Order.css";

const CreateOrder = () => {
  const [lastNum, setLastNum] = useState("");

  useEffect(() => {
    getApi("orders/findLast").then((data) =>
      data.length > 0 ? setLastNum(data[0]) : setLastNum(0)
    );
  }, []);

  const handleClick = (order) => {
    fetchApi("POST", "orders", order);
  };

  console.log(lastNum);

  const orderOptions = {
    orderNum: 0,
    client: null,
    date: new Date(),
    codes: [],
    products: [],
    pricePerProduct: [],
    ledColor: "",
    finishingColor: "",
    seam: "",
    observation: "",
    totalWeight: null,
    totalValue: null,
    discount: null,
    finalValue: null,
  };

  return (
    <div className="container">
      <OrderForm
        click={handleClick}
        actionType={"Cadastrar"}
        options={{ selectDefault: "default", order: orderOptions }}
      />
    </div>
  );
};

export default CreateOrder;
