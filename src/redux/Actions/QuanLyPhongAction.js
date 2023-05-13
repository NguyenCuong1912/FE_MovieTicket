import { quanLyPhongServices } from "../../services/QuanLyPhongServices";
import { PHONG_EDIT, SET_LIST_PHONG } from "./../Types/QuanLyPhongType";
import { message } from "antd";
import { history } from "../../App";

export const layDanhSachPhongAction = (name = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhongServices.layDanhSachPhong(name);
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_PHONG,
          lstPhong: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const chiTietPhongAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhongServices.chiTietPhong(id);
      if (result.status === 200) {
        dispatch({
          type: PHONG_EDIT,
          phongEdit: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const themPhongAction = (dataCraete) => {
  return async (dispatch) => {
    try {
      console.log(dataCraete, "cre");
      const result = await quanLyPhongServices.themPhong(dataCraete);
      if (result.status === 201) {
        message.success("Thêm thành công");
        history.push(`/Admin/Rooms`);
      }
    } catch (error) {
      message.error("Thất bại");
      console.log(error);
    }
  };
};
export const xoaPhongAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhongServices.xoaPhong(id);
      if (result.status === 200) {
        message.success("Xóa thành công");
        await dispatch(layDanhSachPhongAction());
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
      const result = await quanLyPhongServices.capNhatPhong(id, dataEdit);
      if (result.status === 200) {
        message.success("Cập nhật thành công");
        history.push(`/Admin/Rooms`);
      }
    } catch (error) {
      message.error("Thất Bại");
      console.log(error);
    }
  };
};
