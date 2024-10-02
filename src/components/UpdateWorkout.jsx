import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateWorkout() {
  const { id } = useParams(); // Get workout ID from URL
  const [workout, setWorkout] = useState({
    name: "",
    duration: 0,
    isActive: false,
  });
  const [message, setMessage] = useState("");
  const [modalShow, setModalShow] = useState(true); // Modal is shown by default
  const navigate = useNavigate();

  // Handle form submission to update the workout
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      setMessage("You need to be logged in to update a workout.");
      return;
    }

    try {
      const response = await fetch(
        `https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(workout), // Send updated workout data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update workout");
      }

      setMessage("Workout updated successfully!");
      setModalShow(false); // Close modal after successful update
      navigate("/workouts"); // Redirect to workouts page after successful update
    } catch (error) {
      setMessage("Error updating workout: " + error.message);
    }
  };

  return (
    <>
      {/* Modal for updating workout */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <div className="alert alert-info">{message}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={workout.name}
                onChange={(e) =>
                  setWorkout({ ...workout, name: e.target.value })
                }
                required
                placeholder="Enter workout name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (in minutes)</Form.Label>
              <Form.Control
                type="number"
                value={workout.duration}
                onChange={(e) =>
                  setWorkout({ ...workout, duration: Number(e.target.value) })
                }
                required
                placeholder="Enter duration"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Completed"
                checked={workout.isActive}
                onChange={(e) =>
                  setWorkout({ ...workout, isActive: e.target.checked })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Workout
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
