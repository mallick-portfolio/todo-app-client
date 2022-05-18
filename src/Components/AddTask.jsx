import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AddTask = () => {
  const [task, setTask] = useState({
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
    setTask({
      name: "",
      description: "",
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
              value={task.name}
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Task"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
              value={task.description}
                name="description"
                onChange={handleChange}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTask;
