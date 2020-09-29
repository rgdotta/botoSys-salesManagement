import React, { useState, useEffect } from "react";

import { getApi, fetchApi } from "../../../bin/callApi";

import OrderForm from "./Form/OrderForm";

import "./Order.css";

const CreateOrder = () => {
  const [lastNum, setLastNum] = useState(1);

  useEffect(() => {
    getApi("orders/findLast").then(
      (data) => data.length > 0 && setLastNum(data[0])
    );
  }, []);

  const handleClick = (order) => {
    fetchApi("POST", "orders", order);
  };

  console.log(lastNum);

  const orderOptions = {
    orderNum: lastNum,
    client: null,
    date: new Date(),
    products: [],
    aditionalPrice: null,
    ledColor: "",
    finishingColor: "",
    seatFabric: "",
    seam: "",
    observation: "",
    totalWeight: null,
    totalValue: null,
    discount: 0,
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
