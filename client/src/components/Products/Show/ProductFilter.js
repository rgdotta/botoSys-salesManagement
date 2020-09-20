import React from "react";

import { Select } from "antd";
import "./ShowProducts.css";

const Filter = ({ change }) => {
  const filterOptions = [
    "Todos",
    "Cockpit",
    "Suporte de TV",
    "Acessório",
    "Volante",
    "Banco",
    "Outros",
  ];

  return (
    <div className="filterContainer">
      <p>Filtrar por:</p>
      <Select
        id="filter"
        name="filter"
        defaultValue="Todos"
        style={{ width: 150 }}
        onChange={(value) => change(value)}
      >
        {filterOptions.map((option, index) => {
          return (
            <Select.Option key={index} value={option}>
              {option}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};

export default Filter;
