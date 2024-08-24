import DashboardTable from "../components/dashboard/DashboardTable";
import DashboardEditTemplateAction from "../components/dashboard/DashboardEditTemplateAction";
import DashboardUploadCSVAction from "../components/dashboard/DashboardUploadCSVAction";
import DashboardProgress from "../components/dashboard/DashboardProgress";
import DashboardSendEmailsAction from "../components/dashboard/DashboardSendEmailsAction";
// import DashboardAddManuallyAction from "../components/dashboard/DashboardAddManuallyAction";

export default function DashboardPage() {
  return (
    <div className="hero mt-16 min-h-[calc(100vh-4rem)] bg-base-200 p-8">
      <div className="card hero-content h-full w-full max-w-full shrink-0 bg-base-100 shadow-2xl">
        <div className="flex h-full w-full flex-col space-y-4 px-3 py-2">
          <div className="flex justify-between gap-2">
            <div className="flex gap-2">
              <DashboardSendEmailsAction />
              <DashboardEditTemplateAction />
            </div>

            <div className={"opacity-100 transition-opacity ease-linear"} aria-hidden={false}>
              <DashboardProgress autoUpdate={true} />
            </div>

            <div className="flex gap-2">
              <DashboardUploadCSVAction />
              {/* <DashboardAddManuallyAction /> */}
            </div>
          </div>

          <DashboardTable className="grow justify-between" />
        </div>
      </div>
    </div>
  );
}
