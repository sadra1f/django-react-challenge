import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="hero mt-16 min-h-[calc(100vh-4rem)] bg-base-200 p-8">
      <div className="card hero-content h-full w-full max-w-full shrink-0 bg-base-100 shadow-2xl">
        <div className="flex h-full w-full flex-col space-y-4 px-3 py-2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button className="btn btn-primary btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
                Send Emails
              </button>

              <button className="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit Template
              </button>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload CSV
              </button>

              <button className="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Manually
              </button>
            </div>
          </div>

          <div className="flex grow flex-col justify-between space-y-2">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>National ID</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1234567891</th>
                    <td>test@test.com</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="join w-full justify-center">
              <button className="btn join-item btn-sm">1</button>
              <button className="btn join-item btn-active btn-sm">2</button>
              <button className="btn join-item btn-sm">3</button>
              <button className="btn join-item btn-sm">4</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
