import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRow from "../../../components/ReactSlick/MultipleRow";
import { lichChieuTheoHeThongRap } from "../../../redux/Actions/QuanLyLichChieuAction";
import { layDanhSachPhimAction } from "../../../redux/Actions/QuanLyPhimAction";
import CarouselClient from "../../../templates/ClientTemplate/Template/Carousel/CarouselClient";
import HomeMenu from "./HomeMenu";
export default function HomeClient(props) {
  const { lstPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { showTime } = useSelector((state) => state.QuanLyLichChieuReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    dispatch(layDanhSachPhimAction());
    dispatch(lichChieuTheoHeThongRap());
  }, []);
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
