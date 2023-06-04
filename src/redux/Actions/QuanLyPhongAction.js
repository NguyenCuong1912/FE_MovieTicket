import { quanLyPhongServices } from "../../services/QuanLyPhongServices";
import { PHONG_EDIT, SET_LIST_PHONG } from "./../Types/QuanLyPhongType";
import { message } from "antd";
import { history } from "../../App";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";

export const layDanhSachPhongAction = (name = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhongServices.layDanhSachPhong(name);
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_PHONG,
          lstPhong: result.data,
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

export const chiTietPhongAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhongServices.chiTietPhong(id);
      if (result.status === 200) {
        dispatch({
          type: PHONG_EDIT,
          phongEdit: result.data,
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
export const themPhongAction = (dataCraete) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhongServices.themPhong(dataCraete);
      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm thành công");
        history.push(`/Admin/Rooms`);
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
export const xoaPhongAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhongServices.xoaPhong(id);
      if (result.status === 200) {
        await dispatch(layDanhSachPhongAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Xóa thành công");
      }
    } catch (error) {
      message.error("Thất bại");
      console.log(error);
    }
  };
};
export const capNhatPhongAction = (id, dataEdit) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhongServices.capNhatPhong(id, dataEdit);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Cập nhật thành công");
        history.push(`/Admin/Rooms`);
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};
