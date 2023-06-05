import { message } from "antd";
import { bannerServices } from "../../services/BanerManage";
import { SET_BANNER, SET_DETAIL_BANNER } from "../Types/ManageBannerType";
import { history } from "../../App";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";

export const GetBannerAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await bannerServices.getAll();
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        dispatch({
          type: SET_BANNER,
          data: result.data,
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
export const DeleteBannerAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await bannerServices.deleteBanner(id);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Xóa thành công");
        dispatch(GetBannerAction());
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });

      message.error("Xóa thất bại");
    }
  };
};
export const CreateBannerAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await bannerServices.createBanner(data);
      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm banner thành công");
        history.push("/Admin/Banners");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thêm banner thất bại");
    }
  };
};

export const detailBannerAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await bannerServices.getDetail(id);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        dispatch({
          type: SET_DETAIL_BANNER,
          data: result.data,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
    }
  };
};
export const UpdateBannerAction = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await bannerServices.updateBanner(id, data);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Cập nhật thành công");
        history.push("/Admin/Banners");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Cập nhật thất bại");
    }
  };
};

export const ChangeStatusBannerAction = (id, isActive) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await bannerServices.changeStatus(id, isActive);
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thay đổi thành công");
        dispatch(GetBannerAction());
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thay đổi thất bại");
    }
  };
};
