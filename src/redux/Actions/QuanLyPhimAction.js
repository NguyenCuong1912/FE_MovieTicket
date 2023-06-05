import { history } from "../../App";
import { quanLyPhimServices } from "../../services/QuanLyPhimServices";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";
import { PHIM_EDIT, SEARCH_PHIM, SET_PHIM } from "../Types/QuanLyPhimType";
import { message } from "antd";
export const layDanhSachPhimAction = (name = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhimServices.layDanhSachPhim(name);
      if (result.status === 200) {
        dispatch({
          type: SET_PHIM,
          dataPhim: result.data,
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
export const timKiemPhimAction = (name = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhimServices.layDanhSachPhim(name);
      if (result.status === 200) {
        dispatch({
          type: SEARCH_PHIM,
          dataSearch: result.data,
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
export const themPhimAction = (dataFilm) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhimServices.themPhim(dataFilm);
      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm phim thành công");
        history.push("/Admin/Films");
      } else {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Thất Bại");
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

export const layChiTietPhimAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhimServices.layChiTietPhim(id);
      if (result.status === 200) {
        dispatch({
          type: PHIM_EDIT,
          phimEdit: result.data,
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
export const capNhatPhimAction = (id, phimEdit) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhimServices.capNhatPhim(id, phimEdit);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Cập nhật thành công");
        history.push(`/Admin/Films`);
      } else {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Cập nhật thất bại");
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
export const xoaPhimAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyPhimServices.xoaPhim(id);
      if (result.status === 200) {
        await dispatch(layDanhSachPhimAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Xóa thành công");
        history.push(`/Admin/Films`);
      } else {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Xóa Thất Bại");
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
