import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login, updatePassword } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [pass, setPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visitors, setVisitors] = useState(0)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
  }

// visitors
useEffect(() => {
  let totalVisitors = localStorage.getItem("totalVisitors");
  let hasVisited = localStorage.getItem("hasVisited");
  if (!totalVisitors) {
    totalVisitors = 0;
  }
  if (!hasVisited) {
    totalVisitors = Number(totalVisitors) + 1;
    localStorage.setItem("totalVisitors", totalVisitors);
    localStorage.setItem("hasVisited", "true");
  }
  setVisitors(totalVisitors);
}, []);


  // SIGNUP
const handleSignup = (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    toast.error("Please fill all fields");
    return;
  }

  dispatch(
    signup({
      id: Date.now(),
      name,
      email,
      password,
    })
  );

  toast.success("Account created successfully");
  clearForm();
  setIsSignup(false);
};


  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      dispatch(login(user));
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  // FORGOT PASSWORD
  const forgot = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email);
    if (!user) {
      toast.error("Email mismatch");
      return;
    }
    dispatch(
      updatePassword({
        email,
        password,
      })
    );
    clearForm();
    setPass(false);
    toast.success("Password updated");
  };

  return <>
 <p> Visitors: {visitors}</p>
    <div className="container-fluid vh-100">
      <div className="row h-100 align-items-center">
        <div className="col-md-5 d-flex justify-content-center">
          <div className="w-75 p-4 shadow rounded">
            <h4 className="text-center mb-4">
              {isSignup ? "Sign Up" : pass ? "Reset Password" : "Login"}
            </h4>

            <form
              onSubmit={pass ? forgot : isSignup ? handleSignup : handleLogin}
            >
              {isSignup && (
                <input type='text'
                  className="form-control mb-3"
                  placeholder="User Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <input type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder={pass ? "Enter New Password" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="btn btn-success w-100 mb-3">
                {pass
                  ? "Update New Password"
                  : isSignup
                  ? "Create Account"
                  : "Login"}
              </button>
            </form>

            <div className="d-flex justify-content-between">
              {!isSignup && (
                <button
                  type="button"
                  className="btn p-0 text-primary"
                  onClick={() => setPass(true)}
                >
                  Forgot password
                </button>
              )}

              <span
                className="text-success fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsSignup(!isSignup);
                  setPass(false);
                }}
              >
                {isSignup ? "Login" : "Sign up"}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <img
            src="amypo_exp_tcr.png"
            alt="Amypo"
            className="img-fluid"
            style={{ maxWidth: "600px" }}
          />
        </div>
      </div>
    </div>
  </>
}
