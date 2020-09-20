import React from "react";

import NumberFormat from "react-number-format";
import moment from "moment";

import ClientFormSubitem from "./ClientFormSubitem";

import { Form, Input, DatePicker } from "antd";

const ClientFormItem = ({ property, change, error, entity, def }) => {
  const [key, value] = property;
  key === "birthday" && console.log(moment(value));

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
                defaultValue={moment(value)}
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
          def={def}
        />
      );
    });
  }
  return <div></div>;
};

export default ClientFormItem;
