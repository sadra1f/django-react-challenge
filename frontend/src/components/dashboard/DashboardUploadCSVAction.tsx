import axios from "axios";
import { useRef } from "react";
import { API_ROOT } from "../../shared/const";
import { getAuthHeaders } from "../../shared/utils";

export default function DashboardUploadCSVAction() {
  const csvFileInputRef = useRef<HTMLInputElement>(null);

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
    <>
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
    </>
  );
}
