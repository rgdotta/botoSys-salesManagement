import React, { useState, useEffect } from "react";

import { getApi, fetchApi } from "../../../bin/callApi";
import NumberFormat from "react-number-format";

import { Table, List, Button, Popconfirm } from "antd";
import "./ShowClients.css";

const ShowClients = () => {
  const [clients, setClients] = useState();

  useEffect(() => {
    getApi("clients").then((data) => setClients(data));
  }, []);

  //delete client
  const handleDelete = (toDelete, index) => {
    const prevClients = [...clients];

    fetchApi("DELETE", "clients", {
      id: toDelete,
    });

    prevClients.splice(index, 1);

    setClients(prevClients);
  };

  //separate data into table format
  const mainData = [];

  clients &&
    clients.forEach((client, index) => {
      const mainInstance = {
        id: client._id,
        key: index,
        name: client.name,
        document: (
          <NumberFormat
            value={client.document}
            displayType={"text"}
            format={
              client.entity === "CPF" ? "###.###.###-##" : "##.###.###/####-##"
            }
          />
        ),
        city: client.adress.city + "/" + client.adress.state,
        cellphone: (
          <NumberFormat
            value={client.contact.cellphone}
            displayType={"text"}
            format="(###)#####-####"
          />
        ),
        email: client.contact.email,
        subInstance: {
          key: index,
          company: client.companyName,
          address:
            client.adress.street +
            ", " +
            client.adress.stNumber +
            " - " +
            client.adress.complement,
          zipcode: client.adress.zipcode,
          neightborhood: client.adress.neightborhood,
          phone: (
            <NumberFormat
              value={client.contact.phone}
              displayType={"text"}
              format="(###)####-####"
            />
          ),
          whatsapp: (
            <NumberFormat
              value={client.contact.whatsapp}
              displayType={"text"}
              format="(###)######-####"
            />
          ),
        },
      };

      mainData.push(mainInstance);
    });

  //render the expandable list
  const expandedRowRender = (record, index) => {
    const listItems = [
      { title: "Empresa", dataIndex: "company", key: "company" },
      { title: "Endereço", dataIndex: "adress", key: "adress" },
      { title: "CEP", dataIndex: "zipcode", key: "zipcode" },
      { title: "Bairro", dataIndex: "neighborhood", key: "neightborhood" },
      { title: "Telefone Fixo", dataIndex: "phone", key: "phone" },
      { title: "Whatsapp", dataIndex: "whatsapp", key: "whatsapp" },
    ];

    return (
      <List
        size="small"
        dataSource={listItems}
        footer={
          <div className="btnGroup">
            <Button type="link">Editar</Button>
            <Popconfirm
              title="Você tem certeza que quer deletar esse cliente?"
              okText="Sim"
              cancelText="Não"
              onConfirm={() => handleDelete(record.id, record.key)}
            >
              <Button danger type="link">
                Deletar
              </Button>
            </Popconfirm>
          </div>
        }
        renderItem={(item) => (
          <List.Item>
            <p>
              {item["title"]} : {record["subInstance"][item["dataIndex"]]}
            </p>
          </List.Item>
        )}
      />
    );
  };

  //define table columns
  const mainColumns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Documento", dataIndex: "document", key: "document" },
    { title: "Cidade", dataIndex: "city", key: "city" },
    { title: "Celular", dataIndex: "cellphone", key: "cellphone" },
    { title: "E-mail", dataIndex: "email", key: "email" },
  ];

  console.log(clients);

  return (
    <div>
      <Table
        className="clientTable"
        columns={mainColumns}
        expandable={{ expandedRowRender }}
        dataSource={mainData}
        scroll={{ x: 1300 }}
      />
    </div>
  );
};

export default ShowClients;
