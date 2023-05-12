import React, { Fragment, useEffect, useState } from "react";
import {
  CloseOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import "./Ghe.css";
export default function Seat(props) {
  const { ghe, userLogin, socket } = props;
  const [classGheDaDat, setClassGheDaDat] = useState("");
  const [classGheDangDat, setClassGheDangDat] = useState("");
  const [classGheBanDat, setClassGheBanDat] = useState("");
  useEffect(() => {
    //   socket.on("receive-order-seat", (data) => {
    //     if (data.user.id === userLogin?.id) {
    //       console.log("a");
    //     }
    //     console.log("hello", data);
    socket.on("receive-order-seat", (data) => {
      console.log("check", data);
      setClassGheDangDat("classGheDangDat");
    });
  }, [socket]);
  return (
    <Fragment>
      <button
        disabled={ghe.bookded}
        className={`ghe ${classGheDaDat}
                ${classGheDangDat} ${classGheBanDat}  text-center`}
      >
        {ghe.bookded ? (
          ghe.idUser === userLogin?.id ? (
            <UserOutlined style={{ marginBottom: 10, color: "#03a9f4" }} />
          ) : (
            <CloseOutlined style={{ marginBottom: 10 }} />
          )
        ) : (
          ghe.seatName
        )}
      </button>
    </Fragment>
  );
}
