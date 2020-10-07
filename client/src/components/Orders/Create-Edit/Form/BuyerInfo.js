import React, { useEffect, useState } from "react";

import { getApi } from "../../../../bin/callApi";

import { Select } from "antd";

const BuyerInfo = ({ change, error }) => {
  const [clients, setClients] = useState();
  const [selected, setSelected] = useState();

  const handleChange = (value) => {
    //filter clients to get the selected
    const chosen = clients.filter((client) => {
      return value === client._id;
    });

    ["birthday", "orders"].forEach((e) => delete chosen[0][e]);

    //send them to parent component state
    setSelected(chosen[0]);
    change("client", [chosen[0]]);
  };

  useEffect(() => {
    getApi("clients").then((data) => setClients(data));
  }, []);

  console.log(selected);

  return (
    <div>
      <Select
        style={{ width: "250px" }}
        defaultValue="default"
        id="Select"
        onChange={(value) => handleChange(value)}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
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
      {error.client && <p className="errorTest">{error.client}</p>}
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
