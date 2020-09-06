import React, { useState, useEffect } from "react";

import { getApi } from "../../../bin/callApi";

const ShowClients = () => {
  const [clients, setClients] = useState();

  useEffect(() => {
    getApi("clients").then((data) => setClients(data));
  }, []);

  console.log(clients);

  return <div></div>;
};

export default ShowClients;
