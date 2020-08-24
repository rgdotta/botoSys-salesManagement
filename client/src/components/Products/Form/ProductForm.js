import React, { useState } from "react";

const ProductForm = (props) => {
  const [product, setProduct] = useState({
    type: "",
    code: "",
    name: "",
    photoURL: "",
    stock: 0,
    psv: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(props);

  return (
    <form>
      <label htmlFor="type">Tipo de Produto:</label>
      <select
        name="type"
        defaultValue={"default"}
        onChange={handleChange}
        required
      >
        <option disabled value="default">
          Selecione uma opção
        </option>
        <option value="Cockpit">Cockpit</option>
        <option value="Suporte de TV">Suporte de TV</option>
        <option value="Acessório">Acessório</option>
        <option value="Volante">Volante</option>
        <option value="Outros">Outros</option>
      </select>

      <label htmlFor="code" required>
        Código:
      </label>
      <input
        type="text"
        name="code"
        value={product.code}
        onChange={handleChange}
      />

      <label htmlFor="name" required>
        Nome:
      </label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
      />

      <label htmlFor="photoURL">Foto:</label>
      <input
        type="text"
        name="photoURL"
        value={product.photoURL}
        onChange={handleChange}
      />

      <label htmlFor="stock">Estoque:</label>
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
      />

      <label htmlFor="psv" required>
        PSV:
      </label>
      <input
        type="number"
        name="psv"
        value={product.psv}
        step="0.01"
        onChange={handleChange}
      />

      <input
        type="submit"
        value={props.btnName}
        onClick={(e) => props.click(e, product)}
      />
    </form>
  );
};

export default ProductForm;
