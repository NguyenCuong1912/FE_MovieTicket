import { baseServices } from "./baseServices";

export class QuanLyCumRapServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    layDanhSachCumRap = () => {
        return this.get(`/groupCinemas`)
    }
    themCumRap = (dataCreate) => {
        return this.post(`/groupCinemas`, dataCreate)
    }
    xoaCumRap = (id) => {
        return this.delete(`/groupCinemas/${id}`)
    }
    chiTietCumRap = (id) => {
        return this.get(`/groupCinemas/${id}`);
    }
    capNhatCumRap = (id, dataUpdate) => {
        return this.put(`/groupCinemas/${id}`, dataUpdate)
    }



}

export const quanLyCumRapServices = new QuanLyCumRapServices();