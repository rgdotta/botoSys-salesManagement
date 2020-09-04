import React from "react";
import ClientForm from "./Form/ClientForm";

import { postApi } from "../../../bin/callApi";

import "./Client.css";

const CreateClient = () => {
  const handleClick = (client) => {
    postApi("clients", client);
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
      neighborhood: "",
      city: "",
      state: "",
    },
    birthday: "",
  };

  return (
    <div className="container">
      <ClientForm
        click={handleClick}
        actionType={"Cadastrar"}
        options={{ selectDefault: "default", client: clientOptions }}
      />
    </div>
  );
};

export default CreateClient;
