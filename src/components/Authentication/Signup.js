import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  FloatingLabel,
  Row,
  Col,
  Container,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function Signup() {
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const avatarRef = useRef();
  const teamRef = useRef();
  const baseRef = useRef();

  const { signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([{ name: "...", id: "initial" }]);
  const [bases, setBases] = useState([{ name: "...", id: "initial" }]);

  useEffect(
    () =>
      onSnapshot(collection(db, "teams"), (snapshot) =>
        setTeams(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "bases"), (snapshot) =>
        setBases(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Ah snap! Passwords don't match.");
    }

    try {
      setLoading(true);
      setError("");
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        fnameRef.current.value,
        lnameRef.current.value,
        teamRef.current.value,
        baseRef.current.value,
        avatarRef.current.files[0]
      ).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.log(err);
      setError("Whoops, you already have an account with us.");
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
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row className="">
                  <Form.Group as={Col} md="6" controlId="fname_col" required>
                    <FloatingLabel
                      controlId="fname_input"
                      label="First Name"
                      className="mb-2 mt-2"
                    >
                      <Form.Control
                        required
                        type="text"
                        ref={fnameRef}
                        placeholder="First Name"
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lname_col" required>
                    <FloatingLabel
                      controlId="lname_input"
                      label="Last Name"
                      className="mb-2 mt-2"
                    >
                      <Form.Control
                        required
                        type="text"
                        ref={lnameRef}
                        placeholder="Last Name"
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Row>
                <Form.Group id="email" className="mt-2">
                  <FloatingLabel
                    controlId="email_input"
                    label="Work Email"
                    className="mb-3"
                  >
                    <Form.Control type="email" ref={emailRef} required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group id="password" className="mt-2">
                  <FloatingLabel
                    controlId="password_input"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control type="password" ref={passwordRef} required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group id="password-confirm" className="mt-2">
                  <FloatingLabel
                    controlId="confirm_password_input"
                    label="Confirm Password"
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mt-2">
                  <FloatingLabel
                    controlId="team_input"
                    label="Team"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="select-team"
                      ref={teamRef}
                      required
                    >
                      {teams.map((team, i) => (
                        <option key={i} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mt-2">
                  <FloatingLabel
                    controlId="base_input"
                    label="Base Location"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="select-base"
                      ref={baseRef}
                      required
                    >
                      {bases.map((base, i) => (
                        <option key={i} value={base.id}>
                          {base.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="avatar-upload" className="mt-2 mb-3">
                  <Form.Label>Upload Avatar</Form.Label>
                  <Form.Control ref={avatarRef} type="file" />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Sign Up &nbsp;
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
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
