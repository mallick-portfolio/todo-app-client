import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import auth from "../firebase.init.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  if (error) {
    toast.warning("SignUp Failed. Please Try Again");
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    navigate(from, { replace: true });
  }

  const onSubmit = async (data, e) => {
    await signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-outline mb-1">
              <input
                {...register("email", {
                  required: "Please enter your email address",
                  pattern: {
                    value:
                      // eslint-disable-next-line no-useless-escape
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Email"
                className="form-control"
              />
              {errors.email && (
                <p className="text-danger">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-outline mb-1">
              <input
                {...register("password", {
                  required: true,
                  maxLength: {
                    value: 15,
                    message: "Max length is 15",
                  },
                  minLength: {
                    value: 8,
                    message: "Minimum length is 8",
                  },
                })}
                type={"password"}
                placeholder="password"
                className="form-control"
              />
              {errors.password && (
                <p className="text-danger">{errors.password?.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>
            <div className="text-center">
              <p>
                Create an Account <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
