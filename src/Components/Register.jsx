import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import auth from "../firebase.init.js";
const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (error) {
    toast.warning("SignUp Failed. Please Try Again");
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: {user.email}</p>
      </div>
    );
  }

  const onSubmit = async (data, e) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-outline mb-1">
              <input
                {...register("name", {
                  required: "Please enter your Name",
                  value: "",
                })}
                type="text"
                placeholder="Name"
                className="form-control"
              />
              <p className="text-danger">
                {errors.name?.type === "required" && "* Name is required"}
              </p>
            </div>

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
            <div className="form-outline mb-1">
              <input
                {...register("confirm_password", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                placeholder="Confirm password"
                type="password"
                className="form-control"
              />
              {errors.confirm_password && (
                <p className="text-danger">{errors.confirm_password.message}</p>
              )}
            </div>

            <div className="row mb-4">
              <div className="col">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            <div className="text-center">
              <p>
                Not a member? <a href="#!">Register</a>
              </p>
              <p>or sign up with:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
