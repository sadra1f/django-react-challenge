import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  switch (error.status) {
    case 500:
      message = error.data.message;
      break;

    case 404:
      title = "Not found!";
      message = "Could not find resource or page.";
      break;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{message}</p>
        </div>
      </div>
    </div>
  );
}
