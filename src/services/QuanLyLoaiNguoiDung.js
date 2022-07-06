import { baseServices } from "./baseServices";

export class QuanLyLoaiNguoiDungServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/typeUsers`);
    }
    chiTietLoaiNguoiDung = (id) => {
        return this.get(`/typeUsers/${id}`);
    }
    themLoaiNguoiDung = (dataCreate) => {
        return this.post(`/typeUsers`, dataCreate);
    }
    xoaLoaiNguoiDung = (id) => {
        return this.delete(`/typeUsers/${id}`);
    }
    capNhatLoaiNguoiDung = (id, dataEdit) => {
        return this.put(`/typeUsers/${id}`, dataEdit);
    }

}

export const quanLyLoaiNguoiDungServices = new QuanLyLoaiNguoiDungServices();