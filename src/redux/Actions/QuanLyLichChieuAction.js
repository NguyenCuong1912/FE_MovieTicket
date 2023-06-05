import { quanLyLichChieuServices } from "../../services/QuanLyLichChieuServices";
import {
  LICH_CHIEU_EDIT,
  SET_LICH_CHIEU,
  SET_LICH_CHIEU_THEO_HE_THONG_RAP,
} from "../Types/QuanLyLichChieuType";
import { message } from "antd";
import { history } from "../../App";
import { themSeatsAction } from "./QuanLySeatsAction";
import { quanLySeatsServices } from "../../services/QuanLySeatsServices";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";

export const layDanhSachLichChieuAction = (name = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyLichChieuServices.layDanhSachLichChieu(name);
      if (result.status === 200) {
        dispatch({
          type: SET_LICH_CHIEU,
          lstShowTime: result.data,
        });
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("ERROR");
      console.log(error);
    }
  };
};
export const chiTietLichChieuAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyLichChieuServices.chiTietLichChieu(id);
      if (result.status === 200) {
        dispatch({
          type: LICH_CHIEU_EDIT,
          showTimeEdit: result.data,
        });
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("ERROR");
    }
  };
};
export const xoaLichChieuAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyLichChieuServices.xoaLichChieu(id);
      if (result.status === 200) {
        message.success("Xóa thành công");
        dispatch(layDanhSachLichChieuAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
      } else {
        message.error("Xóa thất bại");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("ERROR");
    }
  };
};
export const themLichChieuAction = (dataCreate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyLichChieuServices.themLichChieu(dataCreate);
      if (result.status === 201) {
        const dataSeats = {
          price: dataCreate.price,
          idRoom: dataCreate.idRoom,
          idShowTime: result.data.data.id,
        };
        dispatch(themSeatsAction(dataSeats));
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm thành công");
        history.push(`/Admin/ShowTimes`);
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });

      message.error("Thất bại");
    }
  };
};
export const capNhatLichChieuAction = (id, dataEdit) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyLichChieuServices.capNhatLichChieu(
        id,
        dataEdit
      );
      if (result.status === 200) {
        const dataUpdate = {
          idShowTime: id,
          price: dataEdit.price,
        };
        const updateSeat = await quanLySeatsServices.updateSeat(dataUpdate);
        if (updateSeat.status === 200) {
          dispatch({
            type: HIDDEN_LOADING,
          });
          message.success("Cập nhật thành công");
          history.push(`/Admin/ShowTimes`);
        }
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("ERROR");
    }
  };
};
export const lichChieuTheoHeThongRap = (idFilm = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyLichChieuServices.lichChieuTheoHeThongRap(
        idFilm
      );
      if (result.status === 200) {
        dispatch({
          type: SET_LICH_CHIEU_THEO_HE_THONG_RAP,
          showTime: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
