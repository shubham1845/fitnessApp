import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login accessed");

    // Clear previous messages
    setMessage("");

    // Make an API call to log in the user
    try {
      const response = await fetch(
        "https://fitnessapp-api-ln8u.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // Log the response data to inspect the token

      if (response.ok) {
        // Check where the token is located in the response
        const token = data.token || data.access || data.access_token;
        console.log("Token:", token); // Log token to ensure it's correct

        if (token) {
          // Set token in local storage
          localStorage.setItem("token", token);
          setMessage("Login successful!");
          navigate("/workouts");
        } else {
          setMessage("Token not found in the response.");
        }
      } else {
        setMessage(data.message || "Error logging in");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any fetch errors
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
