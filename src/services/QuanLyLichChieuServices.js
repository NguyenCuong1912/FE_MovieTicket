import { baseServices } from "./baseServices";

export class QuanLyLichChieuServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    layDanhSachLichChieu = (name) => {
        return this.get(`/showTimes?name=${name}`);
    }
    chiTietLichChieu = (id) => {
        return this.get(`/showTimes/${id}`);
    }
    xoaLichChieu = (id) => {
        return this.delete(`/showTimes/${id}`);
    }
    themLichChieu = (dataCreate) => {
        return this.post(`/showTimes`, dataCreate);
    }
    capNhatLichChieu = (id, dataEdit) => {
        return this.put(`/showTimes/${id}`, dataEdit)
    }
    lichChieuTheoMaPhimAndMaRap = (idFilm, idCinema) => {
        return this.get(`/showtimes/listShowTime?idFilm=${idFilm}&idCinema=${idCinema}`)
    }
    lichChieuTheoHeThongRap = (idFilm) => {
        return this.get(`/showTimes/lichChieuTheoHeThongRap?idFilm=${idFilm}`)
    }

}

export const quanLyLichChieuServices = new QuanLyLichChieuServices();