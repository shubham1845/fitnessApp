///////////////////
import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import { Container, Button } from "react-bootstrap";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  // Fetch workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in again.");
        return;
      }

      try {
        const response = await fetch(
          "https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Attach token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch workouts: ${errorMessage}`);
        }

        const data = await response.json();
        if (data && Array.isArray(data.workouts)) {
          setWorkouts(data.workouts); // Access the workouts array
        } else {
          console.error("Expected workouts array not found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
      }
    };

    fetchWorkouts();
  }, []); // Re-run the effect if the token changes

  // Delete workout function

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`, // Ensure this matches your backend delete route
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete workout: ${errorMessage}`);
      }

      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== id)
      );
      alert("Workout deleted successfully.");
    } catch (error) {
      console.error("Error deleting workout:", error.message);
    }
  };

  // Update workout function (redirect to an edit form page)
  const handleUpdate = (id) => {
    // Navigate to the update page with the workout ID
    window.location.href = `/update-workout/${id}`;
  };

  // Function to mark workout as completed
  const markAsCompleted = async (id) => {
    try {
      const response = await fetch(
        `https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Update the workout status locally
        const updatedWorkout = await response.json();
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((workout) =>
            workout._id === updatedWorkout._id ? updatedWorkout : workout
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error marking workout as completed:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Your Workouts</h2>

      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <div key={workout._id}>
            <WorkoutCard
              workout={workout}
              onMarkAsCompleted={markAsCompleted}
            />
            <div className="mt-2">
              <Button
                variant="warning"
                className="me-2"
                onClick={() => handleUpdate(workout._id)}
              >
                Update Workout
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(workout._id)}
              >
                Delete Workout
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No workouts added yet.</p>
      )}
    </Container>
  );
}
