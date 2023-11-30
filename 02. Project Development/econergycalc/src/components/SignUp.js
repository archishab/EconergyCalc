import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(props) {

  const [credentials, setCredentials] = useState({email:"", username: "", password:"", cpassword: ""});

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, username, location, password, cpassword} = credentials;

    const response = await fetch("http://localhost:3030/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, username, location, password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save auth-token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/login");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Fields", "danger");
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
          <label htmlFor="username" className="form-label">
            Province/Territory
          </label>
          <select
                    className="form-select"
                    id="location"
                    name="location"
                    aria-label="Default select example"
                    onChange={onChange}
                  >
                    <option>Select a value</option>
                    <option value="Alberta">Alberta</option>
                    <option value="British Columbia">British Columbia</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="New Brunswick">New Brunswick</option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                    <option value="Northwest Territories">Northwest Territories</option>
                    <option value="Nunavut">Nunavut</option>
                    <option value="Yukon">Yukon</option>
                  </select>
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
        <button type="submit" className="btn btn-primary shadow">
          Submit
        </button>
      </form>
    </div>
  )
}
