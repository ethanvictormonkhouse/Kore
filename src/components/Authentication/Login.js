import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  FloatingLabel,
  Container,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(emailRef.current.value, passwordRef.current.value).then(
        () => {
          navigate("/");
        }
      );
    } catch (err) {
      setError("Houston, we have a problem. Check your password.");
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <div>
                <img
                  src="/logo512d.png"
                  className="img-fluid d-block mx-auto my-3 w-25"
                  alt="logo"
                />
              </div>
              <h2 className="text-center mb-2">Log In</h2>
              <p className="text-center mb-4">Welcome to Kore</p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <FloatingLabel
                    controlId="email_input"
                    label="Work Email"
                    className="mb-3"
                  >
                    <Form.Control type="email" ref={emailRef} required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group id="password">
                  <FloatingLabel
                    controlId="password_input"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control type="password" ref={passwordRef} required />
                  </FloatingLabel>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Log In &nbsp;
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    hidden={!loading}
                  />
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
