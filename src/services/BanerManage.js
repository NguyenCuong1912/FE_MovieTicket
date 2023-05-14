import { baseServices } from "./baseServices";

export class BannerServices extends baseServices {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  getAll = () => {
    return this.get(`/banners`);
  };
  getDetail = (id) => {
    return this.get(`/banners/${id}`);
  };
  updateBanner = (id, data) => {
    return this.put(`/banners/${id}`, data);
  };
  deleteBanner = (id) => {
    return this.delete(`/banners/${id}`);
  };
  createBanner = (data) => {
    return this.post("/banners", data);
  };
}

export const bannerServices = new BannerServices();
