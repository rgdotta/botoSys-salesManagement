import React from "react";

import { fetchApi } from "../../../bin/callApi";

import ClientForm from "./Form/ClientForm";

import "./Client.css";

const CreateClient = () => {
  const handleClick = (client) => {
    fetchApi("POST", "clients", client);
  };

  const clientOptions = {
    entity: "CPF",
    name: "",
    companyName: "",
    document: null,
    contact: {
      email: "",
      cellphone: null,
      phone: null,
      whatsapp: null,
    },
    adress: {
      street: "",
      stNumber: null,
      complement: "",
      zipcode: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    birthday: new Date(),
  };

  return (
    <div className="container">
      <ClientForm
        click={handleClick}
        actionType={"Cadastrar"}
        options={{ selectDefault: "default", client: clientOptions }}
        selectDefault="default"
      />
    </div>
  );
};

export default CreateClient;
