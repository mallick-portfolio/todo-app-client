import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTask = async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    };
    loadTask();
  }, []);
  const handleDelete = async (id) => {
    const agree = window.confirm();
    if (agree) {
      await axios.delete(`http://localhost:5000/tasks/${id}`).then((res) => {
        const remaining = tasks.filter((task) => task._id !== id);
        setTasks(remaining);
        toast("deleted successfully");
      });
    }
  };

  const handleComplete = async (id, task) => {
    const complete = {
      name: task.name,
      description: task.description,
      complete: !task.complete,
    };
    await axios
      .put(`http://localhost:5000/tasks/${id}`, complete)
      .then(async (res) => {
        const result = await axios.get("http://localhost:5000/tasks");
        setTasks(result.data);
      });
  };

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
                  <td>
                    {!task.complete ? (
                      <span>{task.name}</span>
                    ) : (
                      <del>{task.name}</del>
                    )}
                  </td>
                  <td>
                    {!task.complete ? (
                      <span>{task.description}</span>
                    ) : (
                      <del>{task.description}</del>
                    )}
                  </td>
                  <td className="d-flex">
                    <Button
                      variant={`${task.complete ? "info" : "success"}`}
                      onClick={() => handleComplete(task._id, task)}
                      className="me-3"
                    >
                      {task.complete ? "completed" : "complete"}
                    </Button>
                    <Button
                      onClick={() => handleDelete(task._id)}
                      variant="warning"
                    >
                      Delete
                    </Button>
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
