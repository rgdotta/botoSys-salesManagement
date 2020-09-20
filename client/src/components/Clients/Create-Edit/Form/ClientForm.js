import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ClientFormItem from "./ClientFormItem";

import { Form, Button, Radio } from "antd";
import "../../../../css/Form.css";

const ClientForm = ({ click, actionType, options, selectDefault }) => {
  const [client, setClient] = useState(options.client);
  const [error, setError] = useState({});

  const history = useHistory();

  const handleChange = (name, value, parentName) => {
    //create
    if (parentName === "contact" || parentName === "adress") {
      setClient((prev) => {
        return {
          ...prev,
          [parentName]: {
            ...prev[parentName],
            [name]: value,
          },
        };
      });
    } else {
      setClient((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const submitClient = (e) => {
    //form validation
    let errors = {};
    let valid = true;
    const required = "Campo obrigatório.";

    if (!client["name"]) {
      errors["name"] = required;
      valid = false;
    }

    if (!client["document"]) {
      errors["document"] = required;
      valid = false;
    }

    if (!client["contact"]["email"]) {
      errors["email"] = required;
      valid = false;
    }

    if (!valid) {
      setError(errors);
    } else {
      click(client);

      history.push("/clients/lista");
    }

    e.preventDefault();
  };

  return (
    <div className="formContainer">
      <Form className="form" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
        <div className="formTitle">
          <h1>{actionType} Cliente</h1>
        </div>

        <Form.Item label="Documento:">
          <Radio.Group
            onChange={(e) => handleChange("entity", e.target.value)}
            value={client.entity}
          >
            <Radio value={"CPF"}>CPF</Radio>
            <Radio value={"CNPJ"}>CNPJ</Radio>
          </Radio.Group>
        </Form.Item>

        {Object.entries(client).map((property, index) => {
          return (
            <ClientFormItem
              key={index}
              property={property}
              change={handleChange}
              error={error}
              entity={client.entity}
              def={selectDefault}
            />
          );
        })}

        <Form.Item className="btnContainer">
          <Button
            className="btn"
            size="large"
            type="primary"
            onClick={submitClient}
          >
            {actionType}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClientForm;
