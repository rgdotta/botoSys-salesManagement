import React from "react";

import { Form, Input, DatePicker } from "antd";
import NumberFormat from "react-number-format";

import ClientFormSubitem from "./ClientFormSubitem";

const ClientFormItem = ({ property, change, error, entity }) => {
  const [key, value] = property;

  //fields that need validation
  if (key === "name" || key === "document" || key === "email") {
    return (
      <Form.Item
        label={key === "name" ? "Nome:" : entity}
        validateStatus={error[key] ? "error" : "success"}
        help={error[key]}
      >
        {/* Nome */}
        {key === "name" && (
          <Input value={value} onChange={(e) => change(key, e.target.value)} />
        )}

        {/* Documento */}
        {key === "document" && (
          <NumberFormat
            className="formaterInput"
            format={entity === "CPF" ? "###.###.###-##" : "##.###.###/####-##"}
            value={value}
            onValueChange={(value) => change(key, value.floatValue)}
          />
        )}
      </Form.Item>
    );
  } else if (key === "birthday" || key === "companyName") {
    //fields that dont need validation
    return (
      <div>
        {key === "birthday" && (
          <div>
            <hr />
            <Form.Item label="Aniversário">
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: "50%" }}
                value={value}
                onChange={(date) => change(key, date)}
              />
            </Form.Item>
          </div>
        )}

        {key === "companyName" && entity === "CNPJ" && (
          <Form.Item label="Razão Social/Fantasia">
            <Input
              value={value}
              onChange={(e) => change(key, e.target.value)}
            />
          </Form.Item>
        )}
      </div>
    );
  } else if (key === "contact" || key === "adress") {
    // contacts and adress
    return Object.entries(value).map((property, index) => {
      return (
        <ClientFormSubitem
          key={index}
          property={property}
          change={change}
          error={error}
          entity={entity}
        />
      );
    });
  }
  return <div></div>;
};

export default ClientFormItem;
