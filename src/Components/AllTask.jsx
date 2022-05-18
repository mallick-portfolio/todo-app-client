import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import Loading from "./Loading.jsx";
const AllTask = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const loadTask = async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
      setIsLoading(false);
    };
    loadTask();
  }, []);
  return (
    <Container className="my-2">
      <Row className="justify-content-center">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={task._id}>
                  <td>{i + 1}</td>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td className="d-flex">
                    <Button  className="mx-1">complete</Button>
                    <Button variant="warning">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllTask;
