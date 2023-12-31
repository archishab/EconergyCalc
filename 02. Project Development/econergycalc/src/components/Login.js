import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credentials, setCredentials] = useState({email:"", password:""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3030/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email, password: credentials.password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save auth-token and redirect
      localStorage.setItem('token', json.authtoken)
      localStorage.setItem('userId', json.userId)
      localStorage.setItem('username', json.username)
      navigate("/dashboard");
      props.showAlert("Logged In Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container form my-5">
      <h3 className="">{props.heading}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" id="email" name="email">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email" name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
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
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <p>
          <small>
            Don't have an account? Click <Link to="/signup">here</Link> to sign
            up.
          </small>
        </p>
        <button type="submit" className="btn btn-primary shadow">
          Submit
        </button>
      </form>
    </div>
  );
}
