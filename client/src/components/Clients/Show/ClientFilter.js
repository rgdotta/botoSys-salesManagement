import React, { useState } from "react";

import { Select, Input } from "antd";

import "./ShowClients.css";

const Filter = ({ set, change }) => {
  const [filter, setFilter] = useState();

  const filterOptions = ["Nome", "Cidade"];

  return (
    <div className="clientFilter">
      <p>Filtrar por:</p>
      <div>
        <Select
          id="filter"
          name="filter"
          defaultValue=" "
          style={{ width: 150 }}
          onChange={(value) => {
            let filt =
              value === "  " ? value : value === "Nome" ? "name" : "city";

            setFilter(filt);
          }}
        >
          <Select.Option value=" "></Select.Option>
          {filterOptions.map((option, index) => {
            return (
              <Select.Option key={index} value={option}>
                {option}
              </Select.Option>
            );
          })}
        </Select>
        <Input
          className="filterInput"
          onChange={(e) => change(e.target.value, filter)}
        />
      </div>
    </div>
  );
};

export default Filter;
