import { checkoutServices } from '../../services/CheckoutServices'

export const RequirementCheckoutAction = (data) => {
    return async dispatch => {
        try {
            const result = await checkoutServices.RequirementCheckout(data);
            if (result.status === 200) {
                window.location.assign(`${result.data}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}