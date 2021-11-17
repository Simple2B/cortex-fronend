import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Client, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";
// import "../Name/name.sass";
import "./AccountReport.sass";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
import { ReactComponent as Brain } from "../../../images/brain.svg";
import Dashboards from "../Dashboard/Dashboards";

export default function AccountReportStart(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("off");

  const [counter, setCounter] = useState<number>(3);

  // 07:47 -> 467 seconds

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      console.log("GET: client_intake name => ", response.data);
      setClient(response.data);
      return response.data;
    } catch (error: any) {
      console.log(
        "GET: error message get_client_intake name =>  ",
        error.message
      );
      console.log(
        "error response data get_client_intake name => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
  }, [api_key]);

  useEffect(() => {
    setActiveBtnRogueMode(activeBtnRogueMode);
  }, [activeBtnRogueMode]);

  const padTime = (time: number) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  const format = (time: number) => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);

    // Get the seconds left after converting minutes
    const seconds = time % 60;

    //Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

  // const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const timerId = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    console.log("startTimer !");

    const timer = setInterval(() => {
      console.log("timer", timer);
      console.log("counter  inside!", counter);

      setCounter((counter) => counter - 1);
    }, 1000);
    // setTimerId(timer);
    timerId.current = timer;
  };

  console.log("counter !", counter);

  const resetTimer = () => {
    timerId.current && clearInterval(timerId.current);
    timerId.current = undefined;
  };

  useEffect(() => {
    if (counter < 1) {
      console.log("timerOver");
      resetTimer();
      setCounter(0);
      return resetTimer();
    }
  }, [counter]);

  return (
    <>
      <Dashboards activeBtnRogueMode={activeBtnRogueMode} />

      <div className="accountReportStart_nameContainer_brain">
        <div className="nameContainer_brainContent">
          <div className="brain">
            <Brain />
          </div>

          <div className="intakeInfoText_results">
            <div className="results">
              <div>63bpm</div>
              <div>HR</div>
            </div>
            <div className="results">
              <div>10</div>
              <div>Resp</div>
            </div>
            <div className="results">
              <div>98%</div>
              <div>SpO2</div>
            </div>
          </div>
        </div>
        <div className="alphaContainer">
          <div className="alphaContainer_text">Alpha</div>
          <div className="alphaContainer_letters">
            <div className="letter">R</div>
            <div className="letter">L</div>
          </div>
          <div className="alphaContainer_dashboard">
            <IntakeAlpha />
          </div>
        </div>
      </div>

      <div className="accountReportStart_modalWindow">
        <div className="modalWindow_content">
          <div className="content">
            <div className="modalWindow_time">
              {counter === 0 ? "Time over" : <>{format(counter)}</>}
            </div>
            <div className="modalWindow_btnStart" onClick={() => startTimer()}>
              Start
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
