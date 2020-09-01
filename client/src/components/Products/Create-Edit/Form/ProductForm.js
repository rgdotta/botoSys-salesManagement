import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Form, Input, Button, Select, InputNumber } from "antd";
import "../../../../css/Form.css";

const ProductForm = ({ click, actionType, options }) => {
  const [product, setProduct] = useState(options.product);
  const [error, setError] = useState({});

  const history = useHistory();

  const handleChange = (name, value, parentName) => {
    //create
    if (parentName === "dimensions") {
      setProduct((prev) => {
        return {
          ...prev,
          dimensions: {
            ...prev.dimensions,
            [name]: value,
          },
        };
      });
    } else if (parentName === "code") {
      let newCode = [...product.code];
      newCode[name] = value;

      setProduct((prev) => {
        return {
          ...prev,
          code: newCode,
        };
      });
    } else {
      setProduct((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  console.log(product);

  const submitProduct = (e) => {
    //form validation
    let errors = {};
    let valid = true;
    const required = "Campo obrigatório.";

    if (!product["type"]) {
      errors["type"] = required;
      valid = false;
    }

    if (!product["code"]) {
      errors["code"] = required;
      valid = false;
    }

    if (!product["name"]) {
      errors["name"] = required;
      valid = false;
    }

    if (!product["psv"]) {
      errors["psv"] = required;
      valid = false;
    }

    if (!valid) {
      setError(errors);
    } else {
      click(product);

      history.push("/products/show");
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
          <h1>{actionType} Produto</h1>
        </div>
        <Form.Item
          label="Tipo:"
          validateStatus={error["type"] ? "error" : "success"}
          help={error["type"]}
        >
          <Select
            id="Select"
            name="type"
            defaultValue={options.selectDefault}
            onChange={(value) => handleChange("type", value)}
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
        </Form.Item>

        <Form.Item
          label="Código"
          validateStatus={error["code"] ? "error" : "success"}
          help={error["code"]}
        >
          <Input
            placeholder="Ex: GTCLM001"
            value={product.code[0]}
            onChange={(e) => handleChange(0, e.target.value, "code")}
          />
          <Input
            placeholder="Ex: GTCLM001"
            value={product.code[1]}
            onChange={(e) => handleChange(1, e.target.value, "code")}
          />
          <Input
            placeholder="Ex: GTCLM001"
            value={product.code[2]}
            onChange={(e) => handleChange(2, e.target.value, "code")}
          />
        </Form.Item>

        <Form.Item
          label="Nome:"
          validateStatus={error["name"] ? "error" : "success"}
          help={error["name"]}
        >
          <Input
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ex: Cockpit Aluminium LM SPEC"
          />
        </Form.Item>

        <Form.Item label="Foto URL:">
          <Input
            value={product.photoURL}
            onChange={(e) => handleChange("photoURL", e.target.value)}
          />
        </Form.Item>

        <hr />

        <Form.Item label="Estoque:">
          <InputNumber
            value={product.stock}
            onChange={(value) => handleChange("stock", value)}
          />
        </Form.Item>

        <Form.Item
          label="PSV:"
          validateStatus={error["psv"] ? "error" : "success"}
          help={error["psv"]}
        >
          <InputNumber
            value={product.psv}
            step={0.2}
            onChange={(value) => handleChange("psv", value)}
          />
        </Form.Item>

        <hr />

        <Form.Item label="Dimensões (cm)">
          <Input.Group compact>
            <Form.Item className="dimensionItems" label="A">
              <InputNumber
                value={product.dimensions.height}
                onChange={(value) =>
                  handleChange("height", value, "dimensions")
                }
              />
            </Form.Item>

            <Form.Item className="dimensionItems" label="C">
              <InputNumber
                value={product.dimensions.length}
                onChange={(value) =>
                  handleChange("length", value, "dimensions")
                }
              />
            </Form.Item>

            <Form.Item className="dimensionItems" label="L">
              <InputNumber
                value={product.dimensions.width}
                onChange={(value) => handleChange("width", value, "dimensions")}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Peso (kg):">
          <InputNumber
            value={product.weight}
            step={0.2}
            onChange={(value) => handleChange("weight", value)}
          />
        </Form.Item>

        <Form.Item className="btnContainer">
          <Button
            className="btn"
            size="large"
            type="primary"
            onClick={submitProduct}
          >
            {actionType}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
