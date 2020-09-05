import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import ProductFormItem from "./ProductFormItem";
import { Form, Button } from "antd";
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

  const submitProduct = (e) => {
    //form validation
    let errors = {};
    let valid = true;
    const required = "Campo obrigatório.";

    if (!product["type"]) {
      errors["type"] = required;
      valid = false;
    }

    if (!product["code"][0]) {
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

      history.push("/produtos/catalogo");
    }

    e.preventDefault();
  };

  return (
    <div className="formContainer">
      <Form className="form" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        <div className="formTitle">
          <h1>{actionType} Produto</h1>
        </div>

        {Object.entries(product).map((property, index) => {
          return (
            <ProductFormItem
              key={index}
              property={property}
              change={handleChange}
              error={error}
              def={options.selectDefault}
              type={product.type}
            />
          );
        })}

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
