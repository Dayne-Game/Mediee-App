import React, { useEffect } from "react";

const Home = ({ location, history }) => {
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/register";

  useEffect(() => {
    history.push(redirect);
  }, [history, redirect]);

  return <h1>Hello World</h1>;
};

export default Home;
