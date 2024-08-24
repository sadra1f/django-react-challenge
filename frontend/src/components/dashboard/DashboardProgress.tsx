import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROOT } from "../../shared/const";
import { getAuthHeaders } from "../../shared/utils";

type PropType = {
  value?: string | number;
  max?: string | number;
  hideControls?: boolean;
  hideCounter?: boolean;
  autoUpdate?: boolean;
  onPlayToggle?: (event?: MouseEvent) => any;
  onStop?: (event?: MouseEvent) => any;
};

export default function DashboardProgress({
  value,
  max,
  hideControls,
  hideCounter,
  autoUpdate,
  onPlayToggle,
  onStop,
}: PropType) {
  const [intervalCount, setIntervalCount] = useState(0);

  const [currentFrom, setCurrentFrom] = useState(value);
  const [currentTo, setCurrentTo] = useState(max);
  const [currentValue, setCurrentValue] = useState(value);
  const [currentMax, setCurrentMax] = useState(max);
  const [currentPlaying, setCurrentPlaying] = useState(false);

  useEffect(() => {
    if (autoUpdate) {
      axios
        .get(API_ROOT + "/mail-operation/progress/", {
          headers: { ...getAuthHeaders() },
        })
        .then((response) => {
          if (response.data && response.data[0]) {
            setCurrentFrom(response.data[0]);
            setCurrentTo(response.data[1]);
            setCurrentValue(response.data[2]);
            setCurrentMax(response.data[3]);
            setCurrentPlaying(response.data[4]);
          }
        });

      setTimeout(() => {
        setIntervalCount(intervalCount + 1);
      }, 3000);
    }
  }, [intervalCount, autoUpdate]);

  function onStopClick() {
    axios.post(
      API_ROOT + "/mail-operation/stop/",
      {},
      {
        headers: { ...getAuthHeaders() },
      },
    );
  }

  function onPlayToggleClick() {
    axios.post(
      API_ROOT + "/mail-operation/pause/",
      {},
      {
        headers: { ...getAuthHeaders() },
      },
    );
  }

  return (
    <div className="flex h-8 items-center gap-2 rounded-full bg-base-200 pe-2">
      {!hideControls && (
        <div className="join">
          <button
            className="btn btn-ghost join-item btn-sm px-1 ps-2"
            onClick={(event) => (onStop ?? onStopClick)(event as any)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            className="btn btn-ghost join-item btn-sm px-1"
            onClick={(event) => (onPlayToggle ?? onPlayToggleClick)(event as any)}
          >
            {currentPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      )}

      <progress className="progress me-2 w-56" value={currentValue} max={currentMax}></progress>

      {currentFrom && currentTo && !hideCounter && (
        <p className="text-xs font-bold">
          From {currentFrom} to {currentTo}
          {currentValue && currentMax && ` - ${currentValue}/${currentMax}`}
        </p>
      )}
    </div>
  );
}
