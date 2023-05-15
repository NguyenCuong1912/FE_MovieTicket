import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Input, Popconfirm } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../../redux/Actions/QuanLyPhimAction";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
export default function Film(props) {
  const { lstPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
      width: "10%",
    },
    {
      title: "Tên Phim",
      dataIndex: "nameFilm",
      width: "20%",
    },
    {
      title: "Tên Phim",
      dataIndex: "actor",
      width: "10%",
    },
    {
      title: "Ảnh",
      dataIndex: "imgFilm",
      render: (text, film) => {
        return (
          <div
            style={{
              width: 100,
              height: 100,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${DOMAIN_STATIC_FILE}${film.imgFilm})`,
            }}
          >
            <img
              style={{ width: 100, height: 100, opacity: 1 }}
              src={`${DOMAIN_STATIC_FILE}${film.imgFilm}`}
              alt={film.imgFilm}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://picsum.photos/id/200/300`;
              }}
            />
          </div>
        );
      },
      width: "15%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "id",
      width: "20%",
      render: (text, film) => {
        return (
          <div className="flex justify-around items-center text-lg">
            <NavLink
              className="hover:text-2xl hover:text-blue-400 text-black"
              to={`/Admin/Films/Edit/${film.id}`}
            >
              <EditOutlined key={1} className="cursor-pointer" />
            </NavLink>
            <div
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa film  ? ")) {
                  dispatch(xoaPhimAction(film.id));
                }
              }}
              className="hover:text-2xl hover:text-red-400 text-black"
            >
              <DeleteOutlined key={2} className=" cursor-pointer" />
            </div>
          </div>
        );
      },
    },
  ];
  const onSearch = (value) => {
    dispatch(layDanhSachPhimAction(value));
  };
  const { Search } = Input;
  return (
    <Fragment>
      <h2 className="text-center my-4 text-2xl">QUẢN LÝ PHIM</h2>
      <div className="mx-10 mb-5">
        <button
          onClick={() => {
            history.push("/Admin/Films/Create");
          }}
          className="text-white bg-sky-500 flex items-center justify-center px-3 py-2"
        >
          <PlusOutlined />
          Thêm Phim
        </button>
      </div>
      <div className="mx-36 my-3">
        <Search placeholder="Nhập tên phim" onSearch={onSearch} enterButton />
      </div>
      <div className="mx-10">
        <Table columns={columns} dataSource={lstPhim} rowKey="id" />
      </div>
    </Fragment>
  );
}
