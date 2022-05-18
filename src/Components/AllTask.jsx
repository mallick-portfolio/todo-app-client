import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import auth from "../firebase.init.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const loadTask = async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    };
    loadTask();
  }, []);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    if (!user) {
      toast("please login first to delete task");
      navigate("/login");
      return;
    }
    const agree = window.confirm();
    if (user && agree) {
      await axios.delete(`http://localhost:5000/tasks/${id}`).then((res) => {
        const remaining = tasks.filter((task) => task._id !== id);
        setTasks(remaining);
        toast("deleted successfully");
      });
    }
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
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td className="d-flex">
                    <Button className="mx-1">complete</Button>
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
