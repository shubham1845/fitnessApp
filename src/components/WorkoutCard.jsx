import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WorkoutCard({ workout, onMarkAsCompleted }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{workout.name}</Card.Title>
        <Card.Text>Duration: {workout.duration} minutes</Card.Text>
        <Card.Text>
          Status: {workout.status === "completed" ? "Completed" : "Pending"}
        </Card.Text>
        <Card.Text>
          Date Added: {new Date(workout.dateAdded).toLocaleDateString()}
        </Card.Text>
        <Button
          variant={workout.status === "completed" ? "success" : "secondary"}
          disabled
        >
          {workout.status === "completed" ? "Completed" : "In Progress"}
        </Button>
        {/* Show the button only if the workout is not completed */}
        {!workout.isActive && (
          <Button
            variant="success"
            onClick={() => onMarkAsCompleted(workout._id)} // Call the function passed as a prop
          >
            Mark as Completed
          </Button>
        )}

        {/* Optional: If you want to show an 'In Progress' button when the workout is in progress */}
        {workout.isActive && (
          <Button variant="success" disabled>
            Completed
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
