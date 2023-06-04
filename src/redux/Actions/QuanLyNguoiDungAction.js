import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDungServices";
import { message } from "antd";
import { TOKEN } from "../../utils/Settings/config";
import {
  ADD_USER,
  SET_LIST_USER,
  USER_EDIT,
} from "./../Types/QuanLyNguoiDungType";
import { history } from "./../../App";
import Cookies from "js-cookie";
import { ErrorUSer } from "../../constants/error";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";
export const SendVerifyEmailAction = (email, idUser) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyNguoiDungServices.sendVerifyEmail(email);
      if (result.status === 201) {
        await dispatch(layChiTietNguoiDungAction(idUser));
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Bạn hãy kiểm tra email");
      }
    } catch (error) {
      message.error("ERROR");
      dispatch({
        type: HIDDEN_LOADING,
      });
    }
  };
};
export const signUp = (thongTinUser, type = 1) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      let result;
      if (type === 2) {
        // đăng kí admin
        thongTinUser.typeUser = 2;

        result = await quanLyNguoiDungServices.signUp(thongTinUser);
      } else {
        // đăng kí client
        result = await quanLyNguoiDungServices.signUp(thongTinUser);
      }

      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Đăng kí tài khoản thành công");
        history.push("/signIn");
        return;
      }
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        if (result.data.notify === ErrorUSer.EMAIL_EXISTS) {
          message.error("Email đã tồn tại");
          return;
        }
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Đăng kí tài khoản thất bại");
    }
  };
};

export const signIn = (thongTinUser) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyNguoiDungServices.signIn(thongTinUser);
      const { notify, user } = result.data;
      if (notify === ErrorUSer.LOCKED) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Tài khoản bị khoá");
        return;
      }
      if (notify === ErrorUSer.PASSWORD_ERROR) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Mật khẩu không chính xác");
        return;
      }
      if (notify === ErrorUSer.EMAIL_NOT_FOUND) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Tài khoản không tồn tại");
        return;
      }
      if (notify === ErrorUSer.SUCCESS) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        if (
          window.sessionStorage.getItem(TOKEN) &&
          window.sessionStorage.getItem("USER_LOGIN")
        ) {
          sessionStorage.removeItem(TOKEN);
          sessionStorage.removeItem("USER_LOGIN");
        }
        window.sessionStorage.setItem(TOKEN, result.data.user.token);
        window.sessionStorage.setItem(
          "USER_LOGIN",
          JSON.stringify(result.data.user.userLogin)
        );
        var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.set("cookieUser", `${sessionStorage.getItem("token")}`, {
          expires: inFifteenMinutes,
        });
        dispatch({
          type: ADD_USER,
          user: result.data.user.userLogin,
        });
        if (result.data.user.userLogin.typeUser.type !== "CLIENT") {
          history.push("/Admin/Home");
        } else {
          history.push("/Home");
        }
        message.success("Đăng nhập thành công");
        return;
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Đăng nhập thất bại");
    }
  };
};

export const layDanhSachnguoiDungAction = (name = "") => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyNguoiDungServices.layDanhSachNguoiDung(name);
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_USER,
          lstUser: result.data,
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
export const layChiTietNguoiDungAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyNguoiDungServices.layChiTietNguoiDung(id);
      if (result.status === 200) {
        dispatch({
          type: USER_EDIT,
          userEdit: result.data,
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
export const capNhatNguoiDungAction = (id, userUpdate) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyNguoiDungServices.capNhatNguoiDung(
        id,
        userUpdate
      );
      if (result.status === 200) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        const type = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        if (
          type.typeUser.type === "ADMIN" ||
          type.typeUser.type === "SUPPER_ADMIN"
        ) {
          history.push(`/Admin/Users`);
        } else {
          const dataUpdate = await quanLyNguoiDungServices.layChiTietNguoiDung(
            id
          );
          if (dataUpdate.status === 200) {
            sessionStorage.setItem("USER_LOGIN", JSON.stringify(result.data));
          }
          await dispatch(layChiTietNguoiDungAction(id));
          history.push(`/Profile`);
        }
        message.success("Cập nhật thành công");
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Cập nhật thất bại");
      console.log(error);
    }
  };
};

export const themNguoiDungAction = (userCraete) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyNguoiDungServices.themNguoiDung(userCraete);

      if (result.status === 201) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.success("Thêm Tài Khoản Thành Công ");
        history.push(`/Admin/Users`);
        return;
      }
      if (result.status === 200) {
        if (result.data.notify === ErrorUSer.EMAIL_EXISTS) {
          dispatch({
            type: HIDDEN_LOADING,
          });
          message.error("Email đã tồn tại");
          return;
        }
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};

export const lockAndUnLockAction = (id, userLock) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLyNguoiDungServices.lockAndUnlock(id, userLock);
      if (result.status === 200) {
        message.success("Thành Công");
        dispatch(layDanhSachnguoiDungAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};

export const xoaNguoiDungAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HIDDEN_LOADING,
      });
      const result = await quanLyNguoiDungServices.xoaNguoiDung(id);
      if (result.status === 200) {
        message.success("Xóa Thành Công");
        dispatch(layDanhSachnguoiDungAction());
        dispatch({
          type: HIDDEN_LOADING,
        });
      }
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("Thất Bại");
    }
  };
};
