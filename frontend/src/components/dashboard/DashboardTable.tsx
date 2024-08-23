export default function DashboardTable({className, rows}: {className?: string, rows: Array<any>}) {
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
        <button className="btn join-item btn-sm">1</button>
        <button className="btn join-item btn-active btn-sm">2</button>
        <button className="btn join-item btn-sm">3</button>
        <button className="btn join-item btn-sm">4</button>
      </div>
    </div>
  );
}
