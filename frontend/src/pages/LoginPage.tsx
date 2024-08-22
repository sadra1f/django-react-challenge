import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <form className="card-body">
            <h1 className="text-center text-2xl font-bold">Login now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
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
