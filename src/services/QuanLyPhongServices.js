import { baseServices } from "./baseServices";

export class QuanLyPhongServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    layDanhSachPhong = (name) => {
        return this.get(`/rooms?name=${name}`);
    }
    layPhongTheoIDCinema = (idCinema) => {
        return this.get(`/rooms/cinemaID/${idCinema}`);
    }
    chiTietPhong = (id) => {
        return this.get(`/rooms/${id}`);
    }
    themPhong = (dataCreate) => {
        return this.post(`/rooms`, dataCreate);
    }
    xoaPhong = (id) => {
        return this.delete(`/rooms/${id}`);
    }
    capNhatPhong = (id, dataEdit) => {
        return this.put(`/rooms/${id}`, dataEdit)
    }

}
export const quanLyPhongServices = new QuanLyPhongServices();