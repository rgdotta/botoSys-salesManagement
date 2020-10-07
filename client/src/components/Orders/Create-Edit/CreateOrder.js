import React, { useState, useEffect } from "react";

import { fetchApi } from "../../../bin/callApi";

import OrderForm from "./Form/OrderForm";

import "./Order.css";

const CreateOrder = () => {
  const handleClick = (order) => {
    fetchApi("POST", "orders", order);
  };

  const orderOptions = {
    orderNum: 1,
    client: null,
    date: new Date(),
    products: [],
    aditionalPrice: { install: null, others: null },
    ledColor: "",
    finishingColor: "",
    seatFabric: "",
    seam: "",
    observation: "",
    totalWeight: null,
    paymentOptions: { opt: "", times: "" },
    totalValue: null,
    discount: 0,
    finalValue: null,
  };

  return (
    <div className="container">
      <OrderForm
        click={handleClick}
        actionType={"Cadastrar"}
        options={orderOptions}
      />
    </div>
  );
};

export default CreateOrder;
