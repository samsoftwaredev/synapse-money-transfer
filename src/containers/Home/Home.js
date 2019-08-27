import React from "react";
import { Redirect } from "react-router-dom";

import "./Home.css";
import Button from "../../components/UI/Button/Button";
const Home = props => {
  const navigateHandler = () => {
    props.history.push("/auth");
  };
  return (
    <div className="HomeContainer">
      <h1 className="HomeTitle GlobalTitle">The Best Way To Send Money</h1>
      <Button clicked={navigateHandler}>Get Started</Button>
    </div>
  );
};
export default Home;
