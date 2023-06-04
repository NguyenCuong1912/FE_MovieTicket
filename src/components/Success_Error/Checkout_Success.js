import React, { useEffect, useRef, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { datVe } from "./../../redux/Actions/QuanLyTicketAction";
import io from "socket.io-client";
import Countdown from "react-countdown";
import { DOMAIN_STATIC_FILE } from "../../utils/Settings/config";
import { history } from "../../App";

export default function Checkout_Success(props) {
  const dispatch = useDispatch();
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("STORE"));
    dispatch(datVe(data));
    setTime(Date.now() + 0.3 * 60 * 1000);
  }, []);

  //! Function

  return (
    <div className="text-center">
      <div className="my-9 flex justify-center">
        <CheckCircleOutlined style={{ fontSize: "100px", color: "green" }} />
      </div>
      <p className="text-2xl">Thanh Toán Thành Công</p>
      <button
        onClick={() => {
          window.close();
        }}
        className="text-xl text-yellow-300 "
      >
        Trang sẽ đóng sau
        <h2 className="mb-0 text-2xl text-center text-red-600">
          {
            <Countdown
              date={time}
              onComplete={() => {
                window.close();
                history.push("/");
              }}
              daysInHours
            />
          }
          S
        </h2>
      </button>
    </div>
  );
}
