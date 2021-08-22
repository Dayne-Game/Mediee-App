import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

const Searchbox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/staff");
    }
  };

  return (
    <Form className="search-container" onSubmit={submitHandler} style={{ marginBottom: "20px" }}>
      <Row>
        <Col md={4}>
          <Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Staff..." className="search-input mr-sm-2 ml-sm-5"></Form.Control>
        </Col>
        <Col md={2}>
          <Button type="submit" variant="outline-success" className="p-2" style={{ height: "45px" }}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Searchbox;
