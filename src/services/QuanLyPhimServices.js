import { baseServices } from "./baseServices";

export class QuanLyPhimServices extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    layDanhSachPhim = (name) => {
        return this.get(`/films?name=${name}`);
    }
    themPhim = (dataFilm) => {
        return this.post(`/films`, dataFilm);
    }
    layChiTietPhim = (id) => {
        return this.get(`/films/${id}`);
    }
    capNhatPhim = (id, phimEdit) => {
        return this.put(`/films/${id}`, phimEdit);
    }
    xoaPhim = (id) => {
        return this.delete(`/films/${id}`);
    }
    layPhimTheoMaRap = (idCinema) => {
        return this.get(`/films/cinemaID/${idCinema}`)
    }
}
export const quanLyPhimServices = new QuanLyPhimServices();