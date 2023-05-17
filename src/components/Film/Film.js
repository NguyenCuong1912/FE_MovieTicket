import React, { useEffect } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import _ from "lodash";
import "./Film.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DOMAIN_STATIC_FILE } from "../../utils/Settings/config";
import { OPEN_MODAL_TRAILER } from "../../redux/Types/ModalType";
import { history } from "../../App";
import { PHIM_DANG_CHIEU } from "../../redux/Types/QuanLyPhimType";
export default function Film(props) {
  const { phim } = props;
  const dispatch = useDispatch();

  return (
    <div className="parent my-10" style={{ height: 500 }}>
      <div className="flex flex-col  h-full mx-10 my-10 p-2 rounded-md shadow-md ">
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
            style={{ height: 300, width: '80%', objectFit: 'fill',marginTop:10 }}
            alt={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
          />
          <div
            className="w-full playVideo "
            style={{
              top: 10,
              width: "80%",
              height: 300,
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({
                type: OPEN_MODAL_TRAILER,
                data: {
                  trailer: phim.trailer,
                  tenPhim: phim.nameFilm,
                },
              });
            }}
          >
            <div className=" rounded-full cursor-pointer">
              <button>
                <PlayCircleOutlined
                  style={{ fontSize: "50px", color: "#fff", opacity: 0.7 }}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            history.push(`/DetailsFilm/${phim.id}`);
          }}
          className="cursor-pointer"
        >
          <div className="mt-6 mb-2">
            <h2 className="text-xl h-16 font-semibold tracking-wide">
              {phim.nameFilm}
            </h2>
          </div>
          <p className="moTa text-coolGray-800">
            {_.truncate(phim.description, { length: 80, separator: "" })}
          </p>
        </div>
      </div>
      <div className="child flex justify-center ">
        <button className="px-10 py-2 text-xl  rounded bg-red-500 text-white">
          <NavLink
            className="text-white"
            activeStyle={{ color: "white" }}
            to={`/DetailsFilm/${phim.id}`}
          >
            Đặt vé
          </NavLink>
        </button>
      </div>
    </div>
  );
}
