import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(props) {

  const [credentials, setCredentials] = useState({email:"", username: "", password:"", cpassword: ""});

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, username, password, cpassword} = credentials;

    const response = await fetch("http://localhost:3030/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, username, password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save auth-token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/login");
    } else {
      alert("Invalid Credentials")
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
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            aria-describedby="emailHelp"
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
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
          />
        </div>
        <p><small>Already have an account? Click <Link to="/login">here</Link> to log in.</small></p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
