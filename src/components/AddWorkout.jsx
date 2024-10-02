import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

export default function AddWorkout() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    console.log("Add work out clicked");
    e.preventDefault();
    const newWorkout = { name, duration, isActive: status };

    const response = await fetch(
      "https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add token or any user-specific auth headers if needed
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newWorkout),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Workout added successfully!");
      setName("");
      setDuration("");
      setStatus(false);
    } else {
      setMessage("Error adding workout. Try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Workout</h2>
      {message && <p>{message}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="workoutName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="workoutDuration">
          <Form.Label>Duration (in minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="workoutStatus">
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Workout
        </Button>
      </Form>
    </Container>
  );
}
