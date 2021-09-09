import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

const ResidentSearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/resident/search/${keyword}`);
    } else {
      history.push("/residents");
    }
  };

  return (
    <Col md={4} sm={8}>
      <Form className="search" onSubmit={submitHandler}>
        <input type="text" class="form-control" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Resident..." /> <button class="btn btn-info">Search</button>{" "}
      </Form>
    </Col>
  );
};

export default ResidentSearchBox;
