import { baseServices } from "./baseServices";

export class QuanLyRapChieuServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    layDanhSachRap = (name) => {
        return this.get(`/cinemas?tenRap=${name}`);
    }
    layRapChieuTheoMaCumRap = (id) => {
        return this.get(`/cinemas/groupID/${id}`)
    }
    chiTietRap = (id) => {
        return this.get(`/cinemas/${id}`)
    }
    themRap = (dataCreate) => {
        return this.post(`/cinemas`, dataCreate)
    }
    capNhatRap = (id, dataEdit) => {
        return this.put(`/cinemas/${id}`, dataEdit)
    }
    xoaRap = (id) => {
        return this.delete(`/cinemas/${id}`)
    }


}
export const quanLyRapChieuServices = new QuanLyRapChieuServices();
