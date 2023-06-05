import { message } from "antd";
import { ErrorUSer } from "../../constants/error";
import { checkoutServices } from "../../services/CheckoutServices";
import { DISPLAY_LOADING, HIDDEN_LOADING } from "../Types/LoadingType";

export const RequirementCheckoutAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      const result = await checkoutServices.RequirementCheckout(data);
      if (
        result.status === 200 &&
        result.data.mess === ErrorUSer.EMAIL_VERIFY
      ) {
        dispatch({
          type: HIDDEN_LOADING,
        });
        message.error("Email chưa xác thực");
        return;
      }
      dispatch({
        type: HIDDEN_LOADING,
      });
      window.open(result.data, "_blank").focus();
    } catch (error) {
      dispatch({
        type: HIDDEN_LOADING,
      });
      message.error("ERROR");
    }
  };
};
