import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../Checkout/Checkout.module.css";
import "../Checkout/Checkout.css";
import { Tooltip, Modal, message } from "antd";
import {
  CloseOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import { history } from "../../../App";
import { layDanhSachGheTheoLichChieu } from "../../../redux/Actions/QuanLySeatsAction";
import { DOMAIN, DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import {
  CHON_GHE,
  CLEAR_VE_DANG_CHON,
} from "../../../redux/Types/QuanLySeatsType";

import Countdown from "react-countdown";
import { RequirementCheckoutAction } from "../../../redux/Actions/QuanLyCheckoutAction";
import axios from "axios";
import io from "socket.io-client";

const { confirm } = Modal;
export default function Checkout(props) {
  const socket = io.connect(`${DOMAIN_STATIC_FILE}`);
  // const { id } = props.match.params;

  const dispatch = useDispatch();
  //! State
  const { phongVe, listGheDangDat } = useSelector(
    (state) => state.QuanLySeatsReducer
  );
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { lstGhe, film } = phongVe;
  const [state, setState] = useState("00:00:00");

  useEffect(() => {
    const data = { room: props.match.params.id, user: userLogin };
    socket.emit("join-room", data);
    dispatch(layDanhSachGheTheoLichChieu(props.match.params.id, userLogin));
    dispatch({
      type: CLEAR_VE_DANG_CHON,
    });
    // setState(Date.now() + 5 * 60 * 1000);
    setState(Date.now() + 10 * 60 * 1000);
    //!
  }, []);

  const data = {
    user: userLogin,
    room: props.match.params.id,
    seats: listGheDangDat,
  };
  const showLeaveConfirm = () => {
    confirm({
      title: "Bạn có chắc muốn rời khỏi phòng đặt vé ?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: "Yes",
      cancelType: "success",
      cancelText: "No",
      onOk() {
        socket.emit("leaveRroom", data);
        history.push("/");
      },
      onCancel() { },
    });
  };

  useEffect(() => {
    socket.on("receive-order-seat", (data) => {
      dispatch(layDanhSachGheTheoLichChieu(props.match.params.id, userLogin));
    });
  }, [socket]);

  //! Function
  const handleSocket = (userLogin, idShowtime, ghe) => {
    const data = {
      user: userLogin,
      room: idShowtime,
      seat: ghe,
    };
    socket.emit("choice-seat", data);
    dispatch({
      type: CHON_GHE,
      gheDuocChon: ghe,
    });
  };

  const renderListGhe = () => {
    console.log(lstGhe, "lstghe");
    return lstGhe?.map((ghe, index) => {
      let classGheDaDat = ghe.bookded ? "gheDaDat" : "";
      let classGheBanDat = "";
      let classGheDangDat = "";
      //! seat you booked
      ghe.idUser === userLogin?.id
        ? (classGheBanDat = "gheBanDat")
        : (classGheBanDat = "");
      //! keepSeat
      if (!!ghe.keepSeat) {
        classGheDangDat =
          parseInt(ghe.keepSeat) === userLogin.id
            ? "gheBanDangDat"
            : "gheNguoiKhacDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              handleSocket(userLogin, props.match.params.id, ghe);
            }}
            disabled={ghe.bookded || classGheDangDat === "gheNguoiKhacDat"}
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
          {/* for 6 8 6 */}
          {/* {(index + 1) % 20 === 0 ? <br /> : ""} */}

          {/* for 4 8 4 and 2 12 2 */}
          {(index + 1) % 16 === 0 ? <br /> : ""}

          {/* 6 8 6 */}
          {/* {
            (index + 3) % 4 === 0 && !['8', '2', '0'].includes((index + 1).toString().slice(-1)) // check if index is divisible by 4
              &&
              (index + 1) % 20 !== 0 // check if index is divisible by 20
              ?
              (
                <Fragment>
                  <span className="mr-7"></span>
                </Fragment>
              ) : (
                ""
              )
          } */}
          {/* 4 8 4 */}
          {/* {
              (index + 1) % 4 === 0
                &&
                (index + 1) % 16 !== 0
                &&
                (index + 1) % 8 !== 0
                ?
                (
                  <Fragment>
                    <span className="mr-5"></span>
                  </Fragment>
                ) : (
                  ""
                )
            } */}
          {/* 2 12 2 */}
          {
            (index + 1) % 2 === 0 &&
              (index + 1) % 16 !== 0 &&
              (index + 1) % 8 !== 0 &&
              (index + 1) % 4 !== 0 &&
              !((index + 6) % 16 === 0 || (index + 10) % 16 === 0) &&
              !((index - 2) % 16 === 0 || (index + 2) % 16 === 0) &&
              ((index + 1) % 16 !== 6 && (index + 1) % 16 !== 10) &&
              ((index + 1) % 16 !== 22 && (index + 1) % 16 !== 26)
              ?
              (
                <Fragment>
                  <span className="mr-5"></span>
                </Fragment>
              ) : (
                ""
              )
          }
        </Fragment>
      );
    });
  };
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="container pt-5 col-span-9">
        <div
          onClick={() => {
            if (listGheDangDat.length > 0) {
              showLeaveConfirm();
            } else {
              history.push("/");
            }
          }}
          className="flex justify-left align-center mb-3 cursor-pointer"
        >
          <Tooltip placement="right" title="Qua lại trang home" color="blue">
            <p>
              <ArrowLeftOutlined style={{ fontSize: 25, color: "#DB4848" }} />
            </p>
          </Tooltip>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <img
              style={{ width: 50, height: 50, borderRadius: 50 }}
              src={`${DOMAIN_STATIC_FILE}${film?.imgFilm}`}
              alt={film?.imgFilm}
            />

            <div className="ml-3">
              <h3 className="mb-0">
                {film.groupName} - Rạp: {film.rapChieu}
              </h3>
              <p className="mb-0 text-gray-500 font-bold opacity-50">
                -{moment(film.showDate).format("DD/MM/YYYY hh:mm A")}{" "}
              </p>
            </div>
          </div>
          <div>
            <p className="mb-0 text-gray-500">Thời gian giữ ghế</p>
            <h2 className="mb-0 text-2xl text-center text-red-600">
              {
                <Countdown
                  onComplete={() => {
                    alert("Quá thời gian đặt Vé");
                    dispatch({
                      type: CLEAR_VE_DANG_CHON,
                    });
                    socket.emit("leaveRroom", data);
                    history.push("/");
                  }}
                  daysInHours
                  date={state}
                />
              }
            </h2>
          </div>
        </div>
        <div>
          <div className="h-2 w-full bg-black mt-3 opacity-80"></div>
          <div id={style.trapezoid}>
            <h4 className="pt-1 text-center text-black">Màn hình</h4>
          </div>
          <div className="text-center">{renderListGhe()}</div>
        </div>
        {/* table Màu */}
        <div className="mt-5">
          <table className="table-auto min-w-full text-center">
            <thead>
              <tr>
                <th className="w-10 ">Ghế Trống</th>
                <th className="w-10">Ghế Đã đặt</th>
                <th className="w-10">Ghế Bạn Đặt</th>
                <th className="w-10">Ghế bạn đang chọn</th>
                <th className="w-10">Ghế đang giữ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ghe"></td>
                <td className="gheDaDat"></td>
                <td className="gheBanDat"></td>
                <td className="gheBanDangDat"></td>
                <td className="gheNguoiKhacDat"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`col-span-3 px-9 pt-5 flex flex-col  ${style.shadow_right}`}
      >
        <div>
          <div className="text-center text-2xl text-green-600 my-3">
            <span>
              {listGheDangDat
                .reduce((tong, ghe, index) => {
                  return (tong += Number(ghe.price));
                }, 0)
                .toLocaleString()}
              đ
            </span>
          </div>
          <hr />

          <div className="my-3">
            <h3>{film.nameFilm}</h3>
            <p className="mb-1">
              {film.groupName} - {film.rapChieu}
            </p>
            <p className="mb-0">
              {moment(film.showDate).format("DD/MM/YYYY hh:mm A")}
            </p>
          </div>
          <hr />
          <div className="text-lg text-left grid grid-cols-5 my-3 ">
            <div>
              <span className="text-red-600  mb-0">Ghế</span>
            </div>
            <div className="col-span-4">
              <span>
                {" "}
                {_.sortBy(listGheDangDat, ["seatName"]).map((ghe, index) => {
                  return <span key={index}> {ghe.seatName}</span>;
                })}
              </span>
            </div>
          </div>
          <hr />
          <div className="my-3">
            <p className="mb-1 text-gray-500">E-mail</p>
            <p className="mb-0">{userLogin.email}</p>
          </div>
          <hr />
          <div className="my-3">
            <p className="mb-1 text-gray-500">Phone</p>
            <p className="mb-0">{userLogin.phoneNumber}</p>
          </div>
          <hr />
        </div>
        <div
          onClick={() => {
            if (JSON.stringify(listGheDangDat) !== "[]") {
              const thongTinVeDat = {
                userId: userLogin.id,
                listTicket: listGheDangDat,
                idShowTime: props.match.params.id,
              };
              window.sessionStorage.setItem(
                "STORE",
                JSON.stringify(thongTinVeDat)
              );

              let data = [];
              let obj = {};
              for (let index = 0; index < listGheDangDat.length; index++) {
                obj.name = listGheDangDat[index].seatName;
                obj.sku = "ticket";
                obj.price = listGheDangDat[index].price * 1;
                obj.currency = "USD";
                obj.quantity = 1;
                data.push(obj);
              }
              dispatch(RequirementCheckoutAction(data));
            } else {
              alert("Bạn cần chọn ghế ngồi ");
            }
          }}
          className="mb-1 cursor-pointer"
        >
          <div className="py-3 rounded bg-red-500 text-white text-lg text-center">
            ĐẶT VÉ
          </div>
        </div>
      </div>
    </div >
  );
}
