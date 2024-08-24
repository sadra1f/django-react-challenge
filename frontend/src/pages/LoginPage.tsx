import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_ROOT } from "../shared/const";
import { setCookie } from "../shared/utils";
import { AuthenticationContext } from "../store/AuthenticationContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(API_ROOT + "/auth/jwt/create/", {
        email: email,
        password: password,
      })
      .then((response) => {
        setCookie("access", response.data.access ?? "");
        setCookie("refresh", response.data.refresh ?? "");

        setIsAuthenticated(true);

        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error.response?.data?.detail ?? error.message);
      });
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <form className="card-body" onSubmit={authenticate}>
            <h1 className="text-center text-2xl font-bold">Login now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {/* <label className="label">
                <a href="#" className="link-hover link label-text-alt">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
              <label className="label">
                <p className="label-text-alt space-x-1">
                  <span>Don't have an account?</span>
                  <Link to="/signup" className="link-hover link">
                    Sign Up
                  </Link>
                </p>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
