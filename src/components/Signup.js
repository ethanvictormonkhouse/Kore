import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { onSnapshot, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const teamRef = useRef();
  const countryRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([{ name: "Loading...", id: "initial" }]);
  const [countries, setCountries] = useState([
    { name: "Loading...", id: "initial" },
  ]);
  const navigate = useNavigate();

  useEffect(
    () =>
      onSnapshot(collection(db, "teams"), (snapshot) =>
        setTeams(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "countries"), (snapshot) =>
        setCountries(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    []
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mt-2">
              <Form.Label>Work Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" className="mt-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Select Country</Form.Label>
              <Form.Select
                aria-label="select-country"
                ref={countryRef}
                required
              >
                {countries.map((country, i) => (
                  <option key={i} value={country.id}>
                    {country.name} [{country.region}]
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Select Team</Form.Label>
              <Form.Select aria-label="select-team" ref={teamRef} required>
                {teams.map((team, i) => (
                  <option key={i} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
