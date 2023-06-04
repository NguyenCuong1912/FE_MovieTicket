import { history } from "../../App";
import { quanLyCumRapServices } from "../../services/QuanLyCumRapServices";
import {
  GROUP_CINEMAS_EDIT,
  SET_GROUP_CINEMAS,
} from "./../Types/QuanLyCumRapType";
import { message } from "antd";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";

export const layDanhSachCumRapAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyCumRapServices.layDanhSachCumRap();
      if (result.status === 200) {
        dispatch({
          type: SET_GROUP_CINEMAS,
          dataGroupCinemas: result.data,
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
export const themCumRapAction = (cumRapCreate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyCumRapServices.themCumRap(cumRapCreate);
      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm Thành Công");
        history.push(`/Admin/GroupCinemas`);
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};
export const xoaCumRapAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyCumRapServices.xoaCumRap(id);
      if (result.status === 200) {
        dispatch(layDanhSachCumRapAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Xóa thành công");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });

      message.success("Thất bại");
    }
  };
};
export const chiTietCumRapAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyCumRapServices.chiTietCumRap(id);
      if (result.status === 200) {
        dispatch({
          type: GROUP_CINEMAS_EDIT,
          groupCinemaEdit: result.data,
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

export const capNhatCumRapAction = (id, groupCinemaEdit) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyCumRapServices.capNhatCumRap(
        id,
        groupCinemaEdit
      );
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Cập nhật thành công");
        history.push(`/Admin/GroupCinemas`);
      } else {
        message.error("Thất bại");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};
