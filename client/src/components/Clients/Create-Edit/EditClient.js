import React from "react";
import ClientForm from "./Form/ClientForm";

import { fetchApi } from "../../../bin/callApi";

import "./Client.css";

const EditClient = (props) => {
  const toEdit = props.location.state;

  const clientOptions = {
    entity: toEdit.entity,
    name: toEdit.name,
    companyName: toEdit.companyName,
    document: toEdit.document,
    contact: toEdit.contact,
    adress: toEdit.adress,
    birthday: toEdit.birthday,
  };

  const handleClick = (client) => {
    const newClient = { id: toEdit._id, ...client };
    fetchApi("PUT", "clients", newClient);
  };

  return (
    <div className="container">
      <ClientForm
        click={handleClick}
        actionType={"Editar"}
        options={{ selectDefault: "default", client: clientOptions }}
        selectDefault={toEdit.adress.state}
      />
    </div>
  );
};

export default EditClient;
