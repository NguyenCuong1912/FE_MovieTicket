import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRow from "../../../components/ReactSlick/MultipleRow";
import { lichChieuTheoHeThongRap } from "../../../redux/Actions/QuanLyLichChieuAction";
import { layDanhSachPhimAction } from "../../../redux/Actions/QuanLyPhimAction";
import CarouselClient from "../../../templates/ClientTemplate/Template/Carousel/CarouselClient";
import HomeMenu from "./HomeMenu";
import Skeleton from "react-loading-skeleton";
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
      {showTime.length > 0 && lstPhim.length > 0 ? (
        <div>
          <CarouselClient />
          <div className="px-14">
            <MultipleRow arrPhim={lstPhim} />
            <HomeMenu lichChieu={showTime} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            margin: "0 0 100vh 0",
            padding: "30vh 0 0 0",
          }}
        >
          <Skeleton
            style={{
              margin: "0 10px",
            }}
            width={200}
            height={300}
          />
          <Skeleton
            style={{
              margin: "0 10px",
            }}
            width={200}
            height={300}
          />

          <Skeleton
            style={{
              margin: "0 10px",
            }}
            width={200}
            height={300}
          />
          <Skeleton
            style={{
              margin: "0 10px",
            }}
            width={200}
            height={300}
          />

          <Skeleton
            style={{
              margin: "0 10px",
            }}
            width={200}
            height={300}
          />
          <Skeleton
            style={{
              margin: "0 10px",
            }}
            width={200}
            height={300}
          />
        </div>
      )}
    </div>
  );
}
