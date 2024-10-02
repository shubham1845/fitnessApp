import { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { unsetUser } = useContext(UserContext);
  const [isLoggingOut, setIsLoggingOut] = useState(true); // Added state to control logout flow

  useEffect(() => {
    // Simulate async actions for cleanup (if any)
    const performLogout = async () => {
      // Clear user-specific data (like token) from localStorage
      localStorage.removeItem("token");

      // Call unsetUser function to clear user data in context
      if (unsetUser) {
        await unsetUser(); // Await unsetUser if it's asynchronous
      }

      // Set logging out to false to trigger navigation
      setIsLoggingOut(false);
    };

    performLogout(); // Call the async function
  }, [unsetUser]);

  // Show a brief message while logging out
  if (isLoggingOut) {
    return <div>Logging out...</div>;
  }

  // After logging out, redirect to login
  return <Navigate to="/login" />;
}
