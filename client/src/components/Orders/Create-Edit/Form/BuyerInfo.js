import React, { useEffect, useState } from "react";

import { getApi } from "../../../../bin/callApi";

import { Select } from "antd";

const BuyerInfo = () => {
  const [clients, setClients] = useState();
  const [selected, setSelected] = useState();

  const handleChange = (value) => {
    const chosen = clients.filter((client) => {
      return value === client._id;
    });

    setSelected(chosen[0]);
  };

  useEffect(() => {
    getApi("clients").then((data) => setClients(data));
  }, []);

  console.log(selected);

  return (
    <div>
      <Select
        defaultValue="default"
        id="Select"
        onChange={(value) => handleChange(value)}
      >
        <Select.Option disabled value="default">
          Selecione um cliente
        </Select.Option>
        {clients &&
          clients.map((client, index) => {
            return (
              <Select.Option key={index} value={client._id}>
                {client.name}
              </Select.Option>
            );
          })}
      </Select>
      {selected && (
        <div className="buyerContainer">
          <p>Nome: {selected.name}</p>
          <p>
            {selected.entity} : {selected.document}
          </p>
          <p>
            Endereço:
            {selected.adress.street +
              ", " +
              selected.adress.stNumber +
              " - " +
              selected.adress.complement}
          </p>
          <p>Celular: {selected.contact.cellphone}</p>
          <p>E-mail: {selected.contact.email}</p>
        </div>
      )}
    </div>
  );
};

export default BuyerInfo;
