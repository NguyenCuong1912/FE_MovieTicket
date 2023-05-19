import { message } from "antd";
import { CLEAR_VE_DANG_CHON } from "../Types/QuanLySeatsType";
import { quanLyTicketServices } from "./../../services/QuanLyTicketServices";
import { SET_LIST_TICKET_WITH_USER } from "./../Types/QuanLyTicketType";
export const datVe = (dataCreate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyTicketServices.datVe(dataCreate);
      if (result.status === 201) {
        sessionStorage.removeItem("STORE");

        // console.log(data);
        // await dispatch(layDanhSachGheTheoLichChieu(dataCreate.idShowTime));
        // await dispatch(danhSachVeTheoUserAction(dataCreate.userId));
        // await message.success("Đặt vé thành công");
      }
    } catch (error) {
      // message.error("Thất Bại");
      console.log(error);
    }
  };
};

export const danhSachVeTheoUserAction = (idUser) => {
  return async (dispatch) => {
    try {
      const result = await quanLyTicketServices.danhSachVeTheoUser(idUser);
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_TICKET_WITH_USER,
          lstTicketWithUser: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
