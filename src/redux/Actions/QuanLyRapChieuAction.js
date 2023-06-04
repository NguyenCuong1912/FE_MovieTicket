import { quanLyRapChieuServices } from "../../services/QuanLyRapChieuServices";
import { RAP_CHIEU_EDIT, SET_RAP_CHIEU } from "./../Types/QuanLyRapChieuType";
import { message } from "antd";
import { history } from "../../App";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";

export const layDanhSachRapChieuAction = (name = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyRapChieuServices.layDanhSachRap(name);
      if (result.status === 200) {
        dispatch({
          type: SET_RAP_CHIEU,
          lstRapChieu: result.data,
        });
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      console.log(error);
    }
  };
};

export const themRapAction = (dataCreate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyRapChieuServices.themRap(dataCreate);
      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm thành công");
        history.push(`/Admin/Cinemas`);
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
      console.log(error);
    }
  };
};
export const chiTietRapAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyRapChieuServices.chiTietRap(id);
      if (result.status === 200) {
        dispatch({
          type: RAP_CHIEU_EDIT,
          rapChieuEdit: result.data,
        });
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
    }
  };
};
export const capNhatRapChieuAction = (id, dataEdit) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyRapChieuServices.capNhatRap(id, dataEdit);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Cập nhật thành công");
        history.push(`/Admin/Cinemas`);
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
      console.log(error);
    }
  };
};
export const xoaRapChieuAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyRapChieuServices.xoaRap(id);
      if (result.status === 200) {
        await dispatch(layDanhSachRapChieuAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Xóa thành công");
        history.push(`/Admin/Cinemas`);
      } else {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Thất bại");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất bại");
      console.log(error);
    }
  };
};
