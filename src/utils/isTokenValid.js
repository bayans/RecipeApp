import { jwtDecode } from "jwt-decode";

// Function to check if a JWT token is valid
const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    // Check expiration
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decoded.exp < currentTime) {
      return false; // Token is expired
    }
    return true;
  } catch (error) {
    return false; // Token is invalid
  }
};

export default isTokenValid;