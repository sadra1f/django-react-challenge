import axios from "axios";
import { /*ChangeEvent,*/ useEffect, useRef, useState } from "react";
import { API_ROOT } from "../shared/const";
import { getAuthHeaders } from "../shared/utils";
import DashboardTable from "../components/dashboard/DashboardTable";

export default function DashboardPage() {
  const [rows, setRows] = useState([]);

  const csvFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get(API_ROOT + "/recipients/", {
        headers: { ...getAuthHeaders() },
      })
      .then((response) => {
        setRows(response.data.results);
      });
  }, []);

  function onCSVFileChange(/*event: ChangeEvent*/) {
    if (csvFileInputRef.current) {
      const csvFile = csvFileInputRef.current?.files?.[0];

      if (csvFile) {
        const formData = new FormData();
        formData.append("file", csvFile);
        formData.append("filename", csvFile.name);

        axios
          .put(API_ROOT + "/csv-file/upload/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              ...getAuthHeaders(),
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      csvFileInputRef.current.value = "";
    }
  }

  return (
    <div className="hero mt-16 min-h-[calc(100vh-4rem)] bg-base-200 p-8">
      <div className="card hero-content h-full w-full max-w-full shrink-0 bg-base-100 shadow-2xl">
        <div className="flex h-full w-full flex-col space-y-4 px-3 py-2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              {/* <button className="btn btn-primary btn-sm">
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
              </button> */}

              {/* <button className="btn btn-sm">
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
              </button> */}
            </div>

            <div className="flex gap-2">
              <button className="btn btn-sm" onClick={() => csvFileInputRef.current?.click()}>
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
              <input
                ref={csvFileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={onCSVFileChange}
              />

              {/* <button className="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Manually
              </button> */}
            </div>
          </div>

          <DashboardTable className="grow justify-between" rows={rows} />
        </div>
      </div>
    </div>
  );
}
