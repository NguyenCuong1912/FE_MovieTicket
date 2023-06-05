import { message } from "antd";
import { CLEAR_VE_DANG_CHON } from "../Types/QuanLySeatsType";
import { quanLyTicketServices } from "./../../services/QuanLyTicketServices";
import { SET_LIST_TICKET_WITH_USER } from "./../Types/QuanLyTicketType";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";
export const datVe = (dataCreate) => {
  return async (dispatch) => {
    try {
      const result = await quanLyTicketServices.datVe(dataCreate);
      if (result.status === 201) {
        sessionStorage.removeItem("STORE");
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
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyTicketServices.danhSachVeTheoUser(idUser);
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_TICKET_WITH_USER,
          lstTicketWithUser: result.data,
        });
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: HIDDEN_LOADING,
      });
    }
  };
};
