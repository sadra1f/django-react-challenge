import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROOT } from "../../shared/const";
import { getAuthHeaders } from "../../shared/utils";

export default function DashboardTable({ className }: { className?: string }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(API_ROOT + `/recipients/?page=${page}`, {
        headers: { ...getAuthHeaders() },
      })
      .then((response) => {
        setRows(response.data.results);
        setTotalPages(response.data.total_pages ?? 0);
      });
  }, [page]);

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
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
            {rows.map((item) => (
              <tr key={item.national_id}>
                <th>{item.national_id}</th>
                <td>{item.email}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="join w-full justify-center">
        <div className="join">
          <button
            className="btn join-item btn-sm"
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page == 1}
          >
            «
          </button>
          <button className="btn join-item btn-sm">
            {page} / {totalPages}
          </button>
          <button
            className="btn join-item btn-sm"
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            disabled={page == totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
