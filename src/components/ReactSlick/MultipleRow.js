import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  ALL_PHIM,
  PHIM_DANG_CHIEU,
  PHIM_SAP_CHHIEU,
  SET_PHIM,
} from "../../redux/Types/QuanLyPhimType";
import Phim from "../Film/Film";
import styleSlick from "./MultipleRow.module.css";
import _ from "lodash";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const typeNormapBtn =
  "bg-white p-2 text-gray-700 border border-gray-700 rounded mr-3";
const activeBtn = "bg-gray-700 p-2 text-white border border-white rounded mr-3";
export default function MultipleRow(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState("dangChieu");

  const [isActive, setIsActive] = useState(0);

  const renderPhim = () => {
    return props.arrPhim.map((item, index) => {
      return <Phim key={index} phim={item} />;
    });
  };

  const optionFilms = [
    {
      title: "Tất cả",
      action: ALL_PHIM,
      idx: 0,
    },
    {
      title: "Phim Sắp Chiếu",
      action: PHIM_SAP_CHHIEU,
      idx: 1,
    },
    {
      title: "Phim Đang Chiếu",
      action: PHIM_DANG_CHIEU,
      idx: 2,
    },
  ];

  const settings = {
    className: "center variable-width",
    infinite: false,
    centerPadding: "0px",
    slidesToShow: 4,
    speed: 600,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="my-7">
      <div style={{ display: "flex" }}>
        {optionFilms?.map((item, index) => {
          return (
            <div key={item?.idx} className="ml-3 mb-3">
              <button
                onClick={() => {
                  setIsActive(item.idx);
                  dispatch({
                    type: item.action,
                  });
                }}
                className={isActive === item?.idx ? activeBtn : typeNormapBtn}
              >
                {item?.title}
              </button>
            </div>
          );
        })}
      </div>

      <Slider {...settings}>{renderPhim()}</Slider>
    </div>
  );
}
