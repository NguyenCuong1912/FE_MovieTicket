import { baseServices } from "./baseServices";

export class QuanLySeatsServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    themSeats = (dataCreate) => {
        return this.post(`/seats`, dataCreate)
    }
    layDanhSachGheTheoLichCHieu = (idShowTime) => {
        return this.get(`seats?id=${idShowTime}`)
    }
    updateSeat = (dataUpdate) => {
        return this.put(`/seats`, dataUpdate)
    }
    getPriceSeat = (idShowTime) => {
        return this.get(`/seats/priceSeats?idShowTime=${idShowTime}`)
    }

}
export const quanLySeatsServices = new QuanLySeatsServices();
