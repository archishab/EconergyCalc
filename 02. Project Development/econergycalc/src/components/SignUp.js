import React from 'react'
import { Link } from "react-router-dom";

export default function SignUp(props) {
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
          <label for="exampleInputEmail1" class="form-label">
            Username
          </label>
          <input
            type="text"
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
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <p><small>Already have an account? Click <Link to="/login">here</Link> to log in.</small></p>
        <Link
          to="/login"
          className="btn btn-warning "
          tabIndex="1"
          role="button"
        >
          Sign Up
        </Link>
      </form>
    </div>
  )
}
