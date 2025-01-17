import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, setUser, setError } from "./authReducer";
import { signup } from "./client"; // API function
import { Link, useNavigate } from "react-router-dom";
import "../CssFolder/Signup.css";
import { showSuccessToast, showErrorToast } from "../Components/Toast"; 

export default function Signup() {
  const [name, setName] = useState(""); // Add name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: any) => state.auth);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(startLoading());
    try {
      // Add name to the signup payload
      const userData = await signup({ name, email, password });
      dispatch(setUser(userData));
      showSuccessToast("Successful! Please log in.");
      navigate("/Application/Account/Login");
    } catch (e: any) {
      //console.log(e.message);
      dispatch(setError("Failed. Try again."));
      showErrorToast(e.message || "Failed. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
        <p>Sign up to start using our services.</p>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input
            type="text"
            placeholder="Name" // Add placeholder for name
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button className="signup-button" onClick={handleSignup} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="login-redirect">
          Already have an account? <Link to="/Application/Account/Login">Log In Here</Link>
        </p>
        <p className="landing-redirect">
          <Link to="/Application/Landing">Main Page</Link>
        </p>
      </div>
    </div>
  );
}
