import React, { useState } from "react";

import { Form, Input, Button, Select, InputNumber } from "antd";
import "./ProductForm.css";

const ProductForm = ({ click, btnName, options }) => {
  const [product, setProduct] = useState(options.product);
  const [error, setError] = useState({});

  const handleChange = (name, value) => {
    //create
    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(product);

  const submitProduct = (e) => {
    //validation
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
      click(e, product);

      setError({});
      setProduct({
        type: "",
        code: "",
        name: "",
        photoURL: "",
        stock: 0,
        psv: 0,
      });
    }

    e.preventDefault();
  };

  return (
    <Form
      className="form"
      size="large"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
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
        label="Código: "
        validateStatus={error["code"] ? "error" : "success"}
        help={error["code"]}
      >
        <Input
          value={product.code}
          onChange={(e) => handleChange("code", e.target.value)}
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
        />
      </Form.Item>

      <Form.Item label="Foto URL:">
        <Input
          value={product.photoURL}
          onChange={(e) => handleChange("photoURL", e.target.value)}
        />
      </Form.Item>

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

      <Form.Item>
        <Button size="large" type="primary" onClick={submitProduct}>
          {btnName}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
