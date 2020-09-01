import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Form, Input, Button, Select, InputNumber } from "antd";
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
      <Form
        className="form"
        size="large"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        <div className="formTitle">
          <h1>{actionType} Cliente</h1>
        </div>

        <Form.Item
          label="Entidade"
          //   validateStatus={error["code"] ? "error" : "success"}
          //   help={error["code"]}
        ></Form.Item>

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
