import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import "./Ghe.css";

export default React.memo(function Seat(props) {
  const {
    ghe,
    classGheBanDat,
    classGheDangDat,
    classGheDaDat,
    handleSocket,
    idShowtime,
    className,
  } = props;

  const userLogin = useSelector(
    (state) => state.QuanLyNguoiDungReducer.userLogin
  );
  return (
    <button
      onClick={() => {
        handleSocket(userLogin, idShowtime, ghe);
        // handleChoiceSeat(preSeat, currentSeat, nextSeat);
      }}
      disabled={
        ghe?.bookded || classGheDangDat === "gheNguoiKhacDat" || className
      }
      className={`ghe ${classGheDaDat}  ${classGheDangDat} ${classGheBanDat} text-center ${className}`}
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
});
