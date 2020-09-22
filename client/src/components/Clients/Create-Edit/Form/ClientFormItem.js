import React from "react";

import NumberFormat from "react-number-format";
import moment from "moment";

import ClientFormSubitem from "./ClientFormSubitem";

import { Form, Input, DatePicker } from "antd";

const ClientFormItem = ({
  selection,
  property,
  change,
  error,
  entity,
  def,
}) => {
  const [key, value] = property;
  console.log(selection);

  //fields that need validation
  if (selection && selection.includes(key)) {
    if (["name", "document"].includes(key)) {
      return (
        <Form.Item
          label={key === "name" ? "Nome:" : entity}
          validateStatus={error[key] ? "error" : "success"}
          help={error[key]}
        >
          {/* Nome */}
          {key === "name" && (
            <Input
              value={value}
              onChange={(e) => change(key, e.target.value)}
            />
          )}

          {/* Documento */}
          {key === "document" && (
            <NumberFormat
              className="formaterInput"
              format={
                entity === "CPF" ? "###.###.###-##" : "##.###.###/####-##"
              }
              value={value}
              onValueChange={(value) => change(key, value.floatValue)}
            />
          )}
        </Form.Item>
      );
    } else if (["birthday", "companyName"].includes(key)) {
      //fields that dont need validation
      return (
        <div>
          {key === "birthday" && (
            <div>
              <Form.Item label="Aniversário">
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "50%" }}
                  defaultValue={value && moment(value)}
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
    } else if (["contact", "adress"].includes(key)) {
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
  }
  return <div></div>;
};

export default ClientFormItem;
