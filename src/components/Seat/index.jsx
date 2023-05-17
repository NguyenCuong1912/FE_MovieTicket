import React, { memo } from "react";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import "./Ghe.css";
import { useSelector } from "react-redux";

export default React.memo(function Seat(props) {
  const {
    ghe,
    classGheBanDat,
    classGheDangDat,
    classGheDaDat,
    handleSocket,
    // handleChoiceSeat,
    idShowtime,
    preSeat,
    currentSeat,
    nextSeat,
    className,
  } = props;
  console.log('classGheDaDat',classGheDaDat);
  console.log('classGheBanDat',classGheBanDat);
  console.log('classGheDangDat',classGheDangDat);

  const userLogin = useSelector((state) => state.QuanLyNguoiDungReducer.userLogin);
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
})
