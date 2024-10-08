import axios from "axios";
import { API_ROOT } from "../../shared/const";
import { getAuthHeaders } from "../../shared/utils";

type PropType = {
  disabled?: boolean;
  onSendEmails?: (event?: MouseEvent) => any;
};

export default function DashboardSendEmailsAction({ disabled, onSendEmails }: PropType) {
  function onSendEmailsClick() {
    axios.post(
      API_ROOT + "/mail-operation/start/",
      {},
      {
        headers: { ...getAuthHeaders() },
      },
    );

    if (onSendEmails) onSendEmails();
  }

  return (
    <button className="btn btn-primary btn-sm" onClick={onSendEmailsClick} disabled={disabled}>
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
  );
}
