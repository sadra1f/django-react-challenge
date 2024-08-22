import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <form className="card-body">
            <h1 className="text-center text-2xl font-bold">Sign Up!</h1>
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
              <label className="label">
                <p className="label-text-alt space-x-1">
                  <span>Already have an account?</span>
                  <Link to="/login" className="link-hover link">
                    Log In
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
