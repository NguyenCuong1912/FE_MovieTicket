import { baseServices } from "./baseServices";

export class CheckoutServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    RequirementCheckout = (dataCheckout) => {
        return this.post(`/checkout`, dataCheckout)
    }



}

export const checkoutServices = new CheckoutServices();