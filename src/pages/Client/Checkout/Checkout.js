import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../Checkout/Checkout.module.css";
import "../Checkout/Checkout.css";
import { Tooltip, Modal } from "antd";
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import { history } from "../../../App";
import { layDanhSachGheTheoLichChieu } from "../../../redux/Actions/QuanLySeatsAction";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import Countdown from "react-countdown";
import { RequirementCheckoutAction } from "../../../redux/Actions/QuanLyCheckoutAction";
import io from "socket.io-client";
import { chiTietLichChieuAction } from "../../../redux/Actions/QuanLyLichChieuAction";
import RoomSizeM from "../../../components/Room/SizeM";
import RoomSizeL from "../../../components/Room/SizeL";
import RoomSizeS from "../../../components/Room/SizeS";
import { sizeConst } from "../../../constants/roomSize";
import RoomNoraml from "../../../components/Room/Normal";

const { confirm } = Modal;
export default function Checkout(props) {
  //! State
  const listGheRef = useRef([]);
  const socketRef = useRef(null);
  const socket = io.connect(`${DOMAIN_STATIC_FILE}`);
  socketRef.current = socket;

  const { id } = props.match.params;
  const dispatch = useDispatch();

  const listGheDangDat = useSelector(
    (state) => state.QuanLySeatsReducer.listGheDangDat
  );
  const showTimeEdit = useSelector(
    (state) => state.QuanLyLichChieuReducer.showTimeEdit
  );
  const userLogin = useSelector(
    (state) => state.QuanLyNguoiDungReducer.userLogin
  );
  const phongVe = useSelector((state) => state.QuanLySeatsReducer.phongVe);

  const { lstGhe, film } = phongVe;
  const [state, setState] = useState("00:00:00");

  const data = useMemo(() => {
    return {
      user: userLogin,
      room: id,
      seats: listGheDangDat,
    };
  }, [userLogin, id, listGheDangDat]);
  listGheRef.current = listGheDangDat;

  useEffect(() => {
    const data = { room: id, user: userLogin };
    socketRef.current.emit("join-room", data);
    dispatch(layDanhSachGheTheoLichChieu(id, userLogin));
    dispatch(chiTietLichChieuAction(id));
    // setState(Date.now() + 5 * 60 * 1000);
    setState(Date.now() + 10 * 60 * 1000);
  }, []);
  //! event leave Room
  useEffect(() => {
    const leaveRoom = () => {
      const payloadLeaveRoom = {
        room: id,
        user: userLogin,
        seats: listGheRef.current,
      };
      socketRef.current.emit("leaveRroom", payloadLeaveRoom);
    };

    window.addEventListener("beforeunload", () => {
      leaveRoom();
    });

    return () => {
      leaveRoom();
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, [userLogin, id]);

  useEffect(() => {
    socketRef.current.on("receive-order-seat", (data) => {
      dispatch(layDanhSachGheTheoLichChieu(props.match.params.id, userLogin));
    });
  }, []);

  //! Function
  const showLeaveConfirm = () => {
    confirm({
      title: "Bạn có chắc muốn rời khỏi phòng đặt vé ?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      cancelType: "success",
      cancelText: "No",
      onOk() {
        socket.emit("leaveRroom", data);
        history.push("/");
      },
      onCancel() {},
    });
  };

  const handleSocket = useCallback(
    (userLogin, idShowtime, ghe) => {
      const data = {
        user: userLogin,
        room: idShowtime,
        seat: ghe,
      };
      socketRef.current.emit("choice-seat", data);
    },
    [dispatch]
  );

  //! Render
  const renderListGhe = () => {
    if (showTimeEdit?.room.size === "M") {
      return (
        <RoomSizeM
          seat_of_row={16}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
    if (showTimeEdit?.room.size === "L") {
      return (
        <RoomSizeL
          seat_of_row={20}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
    if (showTimeEdit?.room.size === "S") {
      return (
        <RoomSizeS
          seat_of_row={16}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
    if (!sizeConst.includes(showTimeEdit?.room.size)) {
      return (
        <RoomNoraml
          seat_of_row={16}
          lstGhe={lstGhe}
          userLogin={userLogin}
          handleSocket={handleSocket}
          idShowtime={id}
        />
      );
    }
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
                {film.groupName} - Rạp {film.rapChieu} - Phòng {}
                {showTimeEdit?.room?.roomName}
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
                    socket.emit("leaveRroom", data);
                    alert("Quá thời gian đặt Vé");
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
          <div className="mb-12" id={style.trapezoid}>
            <h4 className="pt-1 text-center text-black">Screen</h4>
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
              Rạp : {film.groupName} - {film.rapChieu}
            </p>
            <p>Phòng : {showTimeEdit?.room?.roomName}</p>
            <p className="mb-1">
              Thời gian chiếu:{" "}
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
    </div>
  );
}
