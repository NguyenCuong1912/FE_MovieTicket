import { quanLySeatsServices } from "../../services/QuanLySeatsServices";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";
import { SET_LIST_GHE } from "./../Types/QuanLySeatsType";

export const themSeatsAction = (dataCreate) => {
  return async (dispatch) => {
    try {
      const result = await quanLySeatsServices.themSeats(dataCreate);
      if (result.status === 201) {
        console.log("seats", result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const layDanhSachGheTheoLichChieu = (idShowTime, userLogin) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await quanLySeatsServices.layDanhSachGheTheoLichCHieu(
        idShowTime
      );
      if (result.status === 200) {
        dispatch({
          type: SET_LIST_GHE,
          data: {
            userLogin,
            phongve: result.data,
          },
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
