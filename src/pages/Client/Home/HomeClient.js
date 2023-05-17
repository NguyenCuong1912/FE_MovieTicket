import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRow from "../../../components/ReactSlick/MultipleRow";
import { layDanhSachCumRapAction } from "../../../redux/Actions/QuanLyCumRapAction";
import { lichChieuTheoHeThongRap } from "../../../redux/Actions/QuanLyLichChieuAction";
import { layDanhSachPhimAction } from "../../../redux/Actions/QuanLyPhimAction";
import CarouselClient from "../../../templates/ClientTemplate/Template/Carousel/CarouselClient";
import HomeMenu from "./HomeMenu";
import socketIOClient from "socket.io-client";
import { DOMAIN, DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import axios from "axios";
import { PHIM_DANG_CHIEU, PHIM_SAP_CHHIEU } from "../../../redux/Types/QuanLyPhimType";
export default function HomeClient(props) {
  const { lstPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { showTime } = useSelector((state) => state.QuanLyLichChieuReducer);
  const dispatch = useDispatch();
  useEffect(() => {

    window.history.scrollRestoration = "manual";
    dispatch(layDanhSachPhimAction());
    dispatch(lichChieuTheoHeThongRap());
   
  }, []);
  console.log("lstPhim", lstPhim);
  return (
    <div>
      <CarouselClient />
      <div className="px-14">
        <MultipleRow arrPhim={lstPhim} />
        <HomeMenu lichChieu={showTime} />
      </div>
    </div>
  );
}
