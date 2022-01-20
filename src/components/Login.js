import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, FloatingLabel } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
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
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Log In</h2>
          <p className="text-center mb-4">Welcome to Kore</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <FloatingLabel
                controlId="floatingInput"
                label="Work Email"
                className="mb-3"
              >
                <Form.Control type="email" ref={emailRef} required />
              </FloatingLabel>
            </Form.Group>
            <Form.Group id="password">
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control type="password" ref={passwordRef} required />
              </FloatingLabel>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
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
    </>
  );
}
