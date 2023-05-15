import { message } from "antd";
import { bannerServices } from "../../services/BanerManage";
import { SET_BANNER, SET_DETAIL_BANNER } from "../Types/ManageBannerType";
import { history } from "../../App";

export const GetBannerAction = () => {
  return async (dispatch) => {
    try {
      const result = await bannerServices.getAll();
      if (result.status === 200) {
        dispatch({
          type: SET_BANNER,
          data: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const DeleteBannerAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await bannerServices.deleteBanner(id);
      if (result.status === 200) {
        message.success("Xóa thành công");
        dispatch(GetBannerAction());
      }
    } catch (error) {
      message.error("Xóa thất bại");
      console.log(error);
    }
  };
};
export const CreateBannerAction = (data) => {
  return async () => {
    try {
      const result = await bannerServices.createBanner(data);
      if (result.status === 201) {
        message.success("Thêm banner thành công");
        history.push("/Admin/Banners");
      }
    } catch (error) {
      message.error("Thêm banner thất bại");
      console.log(error);
    }
  };
};

export const detailBannerAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await bannerServices.getDetail(id);
      if (result.status === 200) {
        dispatch({
          type: SET_DETAIL_BANNER,
          data: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const UpdateBannerAction = (id, data) => {
  return async () => {
    try {
      const result = await bannerServices.updateBanner(id, data);
      if (result.status === 200) {
        message.success("Cập nhật thành công");
        history.push("/Admin/Banners");
      }
    } catch (error) {
      message.error("Cập nhật thất bại");
      console.log(error);
    }
  };
};

export const ChangeStatusBannerAction = (id, isActive) => {
  return async (dispatch) => {
    try {
      const result = await bannerServices.changeStatus(id, isActive);
      if (result.status === 200) {
        message.success("Thay đổi thành công");
        dispatch(GetBannerAction());
      }
    } catch (error) {
      message.error("Thay đổi thất bại");
      console.log(error);
    }
  };
};
