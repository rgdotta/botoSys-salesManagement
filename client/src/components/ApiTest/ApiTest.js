import React, { useState, useEffect } from "react";
import { getApi, postApi, patchApi, deleteApi } from "../../bin/callApi";
import "./ApiTest.css";

const ApiTest = () => {
  const [test, setTest] = useState({ title: "", content: "" });
  const [data, setData] = useState({ title: "hi" });

  function handleChange(e) {
    const { name, value } = e.target;

    setTest((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function submitTest(e) {
    postApi("test", test);

    setTest({
      title: "",
      content: "",
    });
    e.preventDefault();
  }

  function editTest(e) {
    const newEdit = {
      id: "5f3c447ee16c9350f91413aa",
      title: test.title,
      content: test.content,
    };

    patchApi("test", newEdit);

    setTest({
      title: "",
      content: "",
    });
    e.preventDefault();
  }

  function deleteTest(e) {
    const id = { id: "5f3c447ee16c9350f91413aa" };

    deleteApi("test", id);

    e.preventDefault();
  }

  useEffect(() => {
    getApi("test").then((each) => setData(each));
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={test.title}
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          value={test.content}
          onChange={handleChange}
          name="content"
        />
        <button onClick={submitTest}>Submit</button>
        <button onClick={editTest}>Edit</button>
        <button onClick={deleteTest}>Delete</button>
        {/* {data.map((each) => (
          <p>{each.title}</p>
        ))} */}
      </header>
    </div>
  );
};

export default ApiTest;
