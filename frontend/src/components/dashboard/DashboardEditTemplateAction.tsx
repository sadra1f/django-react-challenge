import { useEffect, useRef } from "react";
import Editor from "../shared/Editor";
import axios from "axios";
import { API_ROOT } from "../../shared/const";
import { getAuthHeaders } from "../../shared/utils";

export default function DashboardEditTemplateAction() {
  const quillRef = useRef<any>();

  useEffect(() => {
    setDefaultEditorContent();
  }, []);

  function setDefaultEditorContent() {
    axios
      .get(API_ROOT + "/mail-template/", {
        headers: { ...getAuthHeaders() },
      })
      .then((response) => {
        const template: string | undefined = response.data.template;
        quillRef.current.clipboard.dangerouslyPasteHTML(template ?? "<h1>Hello!</h1>");
      })
      .catch((error) => {
        if (error.response?.status == 404) {
          quillRef.current.clipboard.dangerouslyPasteHTML("<h1>Hello!</h1>");
        } else {
          alert(error.response?.data?.detail ?? error.message);
        }
      });
  }

  function onModalToggleClick() {
    setDefaultEditorContent();
    (document.getElementById("edit-template-modal") as any).showModal();
  }

  function onSave() {
    axios
      .post(
        API_ROOT + "/mail-template/",
        {
          template: quillRef.current.getSemanticHTML(),
        },
        {
          headers: { ...getAuthHeaders() },
        },
      )
      .then((response) => {
        const template: string | undefined = response.data.template;
        if (template) {
          quillRef.current.clipboard.dangerouslyPasteHTML(template);
        }
      })
      .catch((error) => {
        alert(error.response?.data?.detail ?? error.message);
      });
  }

  return (
    <>
      <button className="btn btn-sm" onClick={onModalToggleClick}>
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

      <dialog id="edit-template-modal" className="modal">
        <div className="modal-box max-w-[48rem]">
          <h3 className="text-lg font-bold">Edit Email Template</h3>

          <div className="mt-4">
            <Editor ref={quillRef} readOnly={false} />
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex w-full justify-between gap-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm">Discard</button>
              <button className="btn btn-primary btn-sm" onClick={onSave}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
