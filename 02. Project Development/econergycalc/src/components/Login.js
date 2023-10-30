import React from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
  return (
    <div className="container form my-5">
        <h3 className="">{props.heading}</h3>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <p><small>Don't have an account? Click <Link to="/signup">here</Link> to sign up.</small></p>
        <Link
          to="/"
          className="btn btn-warning "
          tabIndex="1"
          role="button"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
