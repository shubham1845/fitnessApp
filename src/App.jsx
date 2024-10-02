import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Container from "react-bootstrap/Container";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
// import { UserProvider } from "./context/UserContext";
import WorkoutList from "./components/WorkoutList";
import AddWorkout from "./components/AddWorkout";
import UpdateWorkout from "./components/UpdateWorkout";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <AppNavBar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/workouts" element={<WorkoutList />} />
              <Route path="/add-workout" element={<AddWorkout />} />
              {/* <Route path="/logout" element={<Logout />} /> */}
              <Route path="/update-workout/:id" element={<UpdateWorkout />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
