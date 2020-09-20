import React from "react";

const Home = () => {
  return (
    <div>
      <Select
        id="Select"
        name={key}
        defaultValue={def}
        onChange={(value) => change(key, value)}
      >
        <Select.Option disabled value="default">
          Selecione uma opção
        </Select.Option>
        {selectOptions.map((option, index) => {
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

export default Home;
