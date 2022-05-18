import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
const AddTask = () => {
  const [task, setTask] = useState({
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/tasks", task).then((response) => {
      toast.success("Task Added Successfully");
      navigate("/");
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
