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
  
  const userLogin = useSelector((state) => state.QuanLyNguoiDungReducer.userLogin);
  // const { phongVe, listGheDangDat } = useSelector(
  //   (state) => state.QuanLySeatsReducer
  // );
  console.log('render', userLogin);

  // const isFrontSeat = listGheDangDat?.forEach((item) => {
  //   const newItem = item?.id - 1

  //   const abc = listGheDangDat?.find((item) => {
  //     console.log(newItem,item,"sdasdasd");
  //     return item?.id === newItem
  //   })

  //   return abc
  //   console.log(item, "itemitem");
  // })
  // console.log(isFrontSeat, "isFrontSeat");

  // console.log(listGheDangDat, "listGheDangDat");

  return (
    <button
      onClick={() => {
        handleSocket(userLogin, idShowtime, ghe);
        // handleChoiceSeat(preSeat, currentSeat, nextSeat);
      }}
      disabled={
        ghe?.bookded || classGheDangDat === "gheNguoiKhacDat" || className
      }
      className={`ghe
                ${classGheDangDat} ${classGheBanDat} ${classGheDaDat}  text-center ${className}`}
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
