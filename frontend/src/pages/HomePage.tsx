import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Hello World!</h1>
          <p className="py-6">
            A web application that allows users to register, upload a large CSV file containing
            national IDs and corresponding email addresses, and send emails to all registered users
            using a dynamic email template.
          </p>
          <Link to="/" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
