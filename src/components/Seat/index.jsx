import React from "react";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import "./Ghe.css";
export default function Seat(props) {
  const {
    ghe,
    userLogin,
    classGheBanDat,
    classGheDangDat,
    classGheDaDat,
    handleSocket,
    handleChoiceSeat,
    idShowtime,
    preSeat,
    currentSeat,
    nextSeat,
    className,
  } = props;

  return (
    <button
      onClick={() => {
        handleSocket(userLogin, idShowtime, ghe);
        // handleChoiceSeat(preSeat, currentSeat, nextSeat);
      }}
      disabled={
        ghe?.bookded || classGheDangDat === "gheNguoiKhacDat" || className
      }
      className={`ghe ${classGheDaDat}
                ${classGheDangDat} ${classGheBanDat}  text-center ${className}`}
    >
      {ghe?.bookded ? (
        ghe?.idUser === userLogin?.id ? (
          <UserOutlined style={{ marginBottom: 10, color: "#03a9f4" }} />
        ) : (
          <CloseOutlined style={{ marginBottom: 10 }} />
        )
      ) : (
        ghe.seatName
      )}
    </button>
  );
}
