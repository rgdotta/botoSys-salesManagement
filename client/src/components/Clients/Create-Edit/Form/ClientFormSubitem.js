import React, { useState } from "react";

import { Form, Select, Input, InputNumber, Checkbox } from "antd";
import NumberFormat from "react-number-format";
import {
  PhoneOutlined,
  TabletOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

const ClientFormSubitem = ({ property, change, error, def }) => {
  const [whatsapp, setWhatsapp] = useState(false);
  const [key, value] = property;

  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  //filds that need validation
  if (key === "email") {
    return (
      <div>
        <hr className="subTitleHr" />
        <p className="subTitle">Contatos</p>

        <Form.Item
          label={<MailOutlined className="clientIcon" />}
          validateStatus={error[key] ? "error" : "success"}
          help={error[key]}
        >
          <Input
            placeholder="E-mail"
            value={value}
            onChange={(e) => change(key, e.target.value, "contact")}
          />
        </Form.Item>
      </div>
    );
  } else if (
    key === "cellphone" ||
    key === "phone" ||
    key === "street" ||
    key === "stNumber" ||
    key === "complement" ||
    key === "neighborhood" ||
    key === "city" ||
    key === "state" ||
    key === "zipcode"
  ) {
    //filds that dont need validation
    return (
      <div>
        {key === "street" && (
          <div>
            <hr className="subTitleHr" />
            <p className="subTitle">Endereço</p>
          </div>
        )}

        <Form.Item
          label={
            key === "cellphone" ? (
              <TabletOutlined className="clientIcon" />
            ) : key === "phone" ? (
              <PhoneOutlined className="clientIcon" />
            ) : key === "street" ? (
              "Logradouro"
            ) : key === "stNumber" ? (
              "Número"
            ) : key === "neighborhood" ? (
              "Bairro"
            ) : key === "complement" ? (
              "Complemento"
            ) : key === "city" ? (
              "Cidade"
            ) : key === "state" ? (
              "Estado"
            ) : (
              "CEP"
            )
          }
        >
          {/* Celular e Telefone */}
          {(key === "cellphone" || key === "phone") && (
            <NumberFormat
              placeholder={key === "cellphone" ? "Celular" : "Telefone Fixo"}
              className="formaterInput"
              format={key === "cellphone" ? "(##)#####-####" : "(##)####-####"}
              value={value}
              onValueChange={(value) =>
                change(key, value.floatValue, "contact")
              }
            />
          )}

          {/* CEP */}
          {key === "zipcode" && (
            <NumberFormat
              className="formaterInput"
              format="#####-###"
              value={value}
              onValueChange={(value) =>
                change(key, value.formattedValue, "adress")
              }
            />
          )}

          {/* Rua. Complemento, Bairro e Cidade */}
          {(key === "street" ||
            key === "complement" ||
            key === "neighborhood" ||
            key === "city") && (
            <Input
              value={value}
              onChange={(e) => change(key, e.target.value, "adress")}
            />
          )}

          {/* Número na rua */}
          {key === "stNumber" && (
            <InputNumber
              value={value}
              onChange={(value) => change("stNumber", value, "adress")}
            />
          )}

          {/* Estado */}
          {key === "state" && (
            <Select
              style={{ width: "70px" }}
              id="Select"
              name="state"
              defaultValue={def}
              onChange={(value) => change("state", value, "adress")}
            >
              <Select.Option disabled value="default"></Select.Option>
              {states.map((option, index) => {
                return (
                  <Select.Option key={index} value={option}>
                    {option}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
      </div>
    );
  } else if (key === "whatsapp") {
    return (
      <div>
        {/* Whatsapp */}
        <Form.Item>
          <Checkbox
            className="checkbox"
            checked={whatsapp}
            onChange={() => setWhatsapp(!whatsapp)}
          >
            Whatsapp diferente do número de celular
          </Checkbox>
        </Form.Item>
        {whatsapp && (
          <Form.Item label={<WhatsAppOutlined className="clientIcon" />}>
            <NumberFormat
              placeholder="Whatsapp"
              className="formaterInput"
              format="(##)#####-####"
              value={value}
              onValueChange={(value) =>
                change(key, value.floatValue, "contact")
              }
            />
          </Form.Item>
        )}
      </div>
    );
  }
  return <div></div>;
};

export default ClientFormSubitem;
