import React, { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import { NavLink } from "react-router-dom";
import { history } from "../../App";

export default function Checkout_Error(props) {
  const [time, setTime] = useState("00:00:18");

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("STORE"));
    sessionStorage.removeItem("STORE");
    setTime(Date.now() + 0.7 * 60 * 1000);
  }, []);
  return (
    <div className="text-center">
      <div className="my-9 flex justify-center">
        <ExclamationCircleOutlined
          style={{ fontSize: "100px", color: "red" }}
        />
      </div>
      <p className="text-2xl">Thanh Toán Thất Bại</p>
      <button
        onClick={() => {
          window.close();
        }}
        className="text-2xl text-green-300 my-8"
      >
        Quay lại đặt vé
      </button>
      <h2 className="mb-0 text-2xl text-center text-red-600">
        <span>Tự động đóng trang sau </span>
        {
          <Countdown
            date={time}
            onComplete={() => {
              window.close();
            }}
            daysInHours
          />
        }
      </h2>
    </div>
  );
}
