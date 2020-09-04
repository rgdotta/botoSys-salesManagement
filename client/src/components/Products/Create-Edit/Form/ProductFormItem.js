import React from "react";

import { Form, Select, Input, InputNumber } from "antd";
import NumberFormat from "react-number-format";

const ProductFormItem = ({ property, change, error, def, type }) => {
  const [key, value] = property;

  //filds that need validation
  if (key === "type" || key === "code" || key === "name" || key === "psv") {
    return (
      <Form.Item
        label={
          key === "type"
            ? "Tipo:"
            : key === "code"
            ? "Código"
            : key === "name"
            ? "Nome"
            : "PSV"
        }
        validateStatus={error[key] ? "error" : "success"}
        help={error[key]}
      >
        {/* Nome */}
        {key === "name" && (
          <Input
            value={value}
            onChange={(e) => change(key, e.target.value)}
            placeholder="Ex: Cockpit Aluminium LM SPEC"
          />
        )}

        {/* Tipo */}
        {key === "type" && (
          <Select
            id="Select"
            name={key}
            defaultValue={def}
            onChange={(value) => change(key, value)}
          >
            <Select.Option disabled value="default">
              Selecione uma opção
            </Select.Option>
            <Select.Option value="Cockpit">Cockpit</Select.Option>
            <Select.Option value="Suporte de TV">Suporte de TV</Select.Option>
            <Select.Option value="Acessório">Acessório</Select.Option>
            <Select.Option value="Volante">Volante</Select.Option>
            <Select.Option value="Outros">Outros</Select.Option>
          </Select>
        )}

        {/* Código */}
        {key === "code" && (
          <div>
            <Input
              placeholder="Ex: GTCLM001"
              value={value[0]}
              onChange={(e) => change(0, e.target.value, key)}
            />
            {type === "Cockpit" && (
              <div>
                <Input
                  placeholder="Ex: GTCLM001"
                  value={value[1]}
                  onChange={(e) => change(1, e.target.value, key)}
                />
                <Input
                  placeholder="Ex: GTCLM001"
                  value={value[2]}
                  onChange={(e) => change(2, e.target.value, key)}
                />
              </div>
            )}
          </div>
        )}

        {/* psv */}
        {key === "psv" && (
          <NumberFormat
            className="formaterInput"
            thousandSeparator="."
            prefix={"R$"}
            decimalScale={2}
            decimalSeparator=","
            value={value}
            onValueChange={(value) => change(key, value.floatValue)}
          />
        )}
      </Form.Item>
    );
  } else if (
    key === "dimensions" ||
    key === "photoURL" ||
    key === "stock" ||
    key === "weight"
  ) {
    //filds that dont need validation
    return (
      <div>
        {(key === "dimensions" || key === "stock") && <hr />}
        <Form.Item
          label={
            key === "dimensions"
              ? "Dimensões (cm)"
              : key === "photoURL"
              ? "URL da foto"
              : key === "stock"
              ? "Estoque"
              : "Peso (KG)"
          }
        >
          {/* Dimensões */}
          {key === "dimensions" && (
            <Input.Group compact>
              <Form.Item className="dimensionItems" label="Altura">
                <InputNumber
                  value={value.height}
                  onChange={(value) => change(key, value, "dimensions")}
                />
              </Form.Item>

              <Form.Item className="dimensionItems" label="Comprim.">
                <InputNumber
                  value={value.length}
                  onChange={(value) => change(key, value, "dimensions")}
                />
              </Form.Item>

              <Form.Item className="dimensionItems" label="Largura">
                <InputNumber
                  value={value.width}
                  onChange={(value) => change(key, value, "dimensions")}
                />
              </Form.Item>
            </Input.Group>
          )}

          {/* Foto */}
          {key === "photoURL" && (
            <Input
              value={value}
              onChange={(e) => change(key, e.target.value)}
            />
          )}

          {/* Estoque e Peso */}
          {(key === "weight" || key === "stock") && (
            <InputNumber
              value={value}
              precision={key === "weight" && 2}
              onChange={(value) => change(key, value)}
            />
          )}
        </Form.Item>
      </div>
    );
  }
  return <div></div>;
};

export default ProductFormItem;