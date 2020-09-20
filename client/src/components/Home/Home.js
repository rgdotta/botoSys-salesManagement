import React from "react";

import BirthdayList from "./Displays/BirthdayList";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <BirthdayList className="birthdayList" />
    </div>
  );
};

export default Home;
