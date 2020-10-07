import React from "react";

import moment from "moment";

import { Form, Select, Input } from "antd";
import BuyerInfo from "./BuyerInfo";
const { TextArea } = Input;

const ProductFormItem = ({ selection, property, change, error, def }) => {
  const [key, value] = property;

  if (selection.includes(key)) {
    if (["orderNum", "date"].includes(key)) {
      return (
        <Form.Item
          className="infoContainer"
          label={key === "date" ? "DATA" : "VENDA Nº"}
        >
          <p className="formInfo">
            {key === "date" ? moment(value).format("DD/MM/YYYY") : value}
          </p>
        </Form.Item>
      );
    } else if (key === "observation") {
      return (
        <div>
          <Form.Item>
            <TextArea
              rows={5}
              value={value}
              onChange={(e) => change(key, e.target.value)}
            />
          </Form.Item>
        </div>
      );
    } else if (
      ["ledColor", "finishingColor", "seatFabric", "seam"].includes(key)
    ) {
      const selectOpt = [
        ["Vermelho", "Azul", "Verde", "RGB"],
        ["Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Laranja"],
        ["Alcântara", "Couro"],
        ["Lisa", "Diamantada"],
      ];
      return (
        <div>
          <Form.Item
            label={
              key === "ledColor"
                ? "Cor do Led"
                : key === "finishingColor"
                ? "Cor do Acabamento"
                : key === "seatFabric"
                ? "Tecido do Banco"
                : "Costura"
            }
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Select
              id="Select"
              name={key}
              defaultValue={def === "default" ? def : value}
              onChange={(value) => change(key, value)}
            >
              <Select.Option disabled value="default">
                {" "}
              </Select.Option>
              {selectOpt[
                key === "ledColor"
                  ? 0
                  : key === "finishingColor"
                  ? 1
                  : key === "seatFabric"
                  ? 2
                  : 3
              ].map((option, index) => {
                return (
                  <Select.Option key={index} value={option}>
                    {option}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
      );
    } else if (key === "client") {
      //fields that dont need validation
      return (
        <div>
          <Form.Item>
            <BuyerInfo change={change} error={error} />
          </Form.Item>
        </div>
      );
    }
  }
  return <div></div>;
};

export default ProductFormItem;
