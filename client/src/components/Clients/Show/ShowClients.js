import React, { useState, useEffect } from "react";

import { getApi, fetchApi } from "../../../bin/callApi";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import moment from "moment";

import { Table, List, Button, Popconfirm, Select, Input } from "antd";
import "./ShowClients.css";

const ShowClients = () => {
  const [clients, setClients] = useState();
  const [filter, setFilter] = useState();
  const [filteredClients, setFilteredClients] = useState();

  const history = useHistory();

  useEffect(() => {
    getApi("clients").then((data) => {
      setClients(data);
      setFilteredClients(data);
    });
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

  const handleFilter = (filter2) => {
    if (filter === " " || !filter2) {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter((client) => {
        const name = client["name"].toUpperCase();
        const city = client["adress"]["city"].toUpperCase();

        return filter === "city"
          ? city.includes(filter2.toUpperCase())
          : name.includes(filter2.toUpperCase());
      });

      setFilteredClients(filtered);
    }
  };

  filteredClients &&
    filteredClients.forEach((client, index) => {
      const bDay = client.birthday
        ? moment(client.birthday).format("DD/MM/YYYY")
        : "";

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
            format="(##)#####-####"
          />
        ),
        email: client.contact.email,
        subInstance: {
          key: index,
          company: client.companyName,
          adress:
            client.adress.street +
            ", " +
            client.adress.stNumber +
            " - " +
            client.adress.complement,
          zipcode: client.adress.zipcode,
          neighborhood: client.adress.neighborhood,
          phone: (
            <NumberFormat
              value={client.contact.phone}
              displayType={"text"}
              format="(##)####-####"
            />
          ),
          whatsapp: (
            <NumberFormat
              value={client.contact.whatsapp}
              displayType={"text"}
              format="(##)######-####"
            />
          ),
          birthday: bDay,
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
      { title: "Aniversário", dataIndex: "birthday", key: "birthday" },
    ];

    return (
      <List
        size="small"
        dataSource={listItems}
        footer={
          <div className="btnGroup">
            <Button
              type="link"
              onClick={() =>
                history.push("/clientes/editar/" + record.id, clients[index])
              }
            >
              Editar
            </Button>
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

  const filterOptions = ["Nome", "Cidade"];

  return (
    <div className="tableContainer">
      <div className="clientFilter">
        <p>Filtrar por:</p>
        <div>
          <Select
            id="filter"
            name="filter"
            defaultValue=" "
            style={{ width: 150 }}
            onChange={(value) => {
              let filt =
                value === "  " ? value : value === "Nome" ? "name" : "city";

              setFilter(filt);
            }}
          >
            <Select.Option value=" "></Select.Option>
            {filterOptions.map((option, index) => {
              return (
                <Select.Option key={index} value={option}>
                  {option}
                </Select.Option>
              );
            })}
          </Select>
          <Input
            className="filterInput"
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
      </div>

      <Table
        className="clientTable"
        columns={mainColumns}
        expandable={{ expandedRowRender }}
        dataSource={mainData}
        scroll={{ x: 1300 }}
        pagination={{
          defaultPageSize: 20,
        }}
      />
    </div>
  );
};

export default ShowClients;
