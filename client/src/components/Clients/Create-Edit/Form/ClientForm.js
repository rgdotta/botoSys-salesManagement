import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";

import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import "../../../../css/Form.css";

const ClientForm = ({ click, actionType, options }) => {
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

    // if (!product["type"]) {
    //   errors["type"] = required;
    //   valid = false;
    // }

    // if (!product["code"]) {
    //   errors["code"] = required;
    //   valid = false;
    // }

    // if (!product["name"]) {
    //   errors["name"] = required;
    //   valid = false;
    // }

    // if (!product["psv"]) {
    //   errors["psv"] = required;
    //   valid = false;
    // }

    if (!valid) {
      setError(errors);
    } else {
      click(client);

      history.push("/clients/show");
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

        <Form.Item
          label="Nome"
          //   validateStatus={error["code"] ? "error" : "success"}
          //   help={error["code"]}
        >
          <Input
            value={client.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Item>

        {client.entity === "CNPJ" && (
          <Form.Item
            label="Razão Social/Fantasia"
            //   validateStatus={error["code"] ? "error" : "success"}
            //   help={error["code"]}
          >
            <Input
              value={client.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </Form.Item>
        )}

        <Form.Item label={client.entity}>
          <NumberFormat
            className="formaterInput"
            format={
              client.entity === "CPF" ? "##.###.###-##" : "##.###.###/####-##"
            }
            value={client.document}
            onChange={(e) => handleChange("document", e.target.value)}
          />
        </Form.Item>

        <hr className="subTitleHr" />
        <p className="subTitle">Contatos</p>

        <Form.Item
          label="E-mail"
          //   validateStatus={error["code"] ? "error" : "success"}
          //   help={error["code"]}
        >
          <Input
            value={client.contact.email}
            onChange={(e) => handleChange("email", e.target.value, "contact")}
          />
        </Form.Item>

        <Form.Item
          label="E-mail"
          //   validateStatus={error["code"] ? "error" : "success"}
          //   help={error["code"]}
        >
          <Input
            value={client.contact.email}
            onChange={(e) => handleChange("email", e.target.value, "contact")}
          />
        </Form.Item>

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
