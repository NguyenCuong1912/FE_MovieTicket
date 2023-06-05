import React, { useEffect } from "react";
import { Table, Button, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { history } from "./../../../App";
import moment from "moment";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachLichChieuAction,
  xoaLichChieuAction,
} from "../../../redux/Actions/QuanLyLichChieuAction";
export default function ShowTime(props) {
  const dispatch = useDispatch();
  const { lstShowTime } = useSelector((state) => state.QuanLyLichChieuReducer);
  useEffect(() => {
    dispatch(layDanhSachLichChieuAction());
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => {
        return <p className="text-center">{text}</p>;
      },
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
      width: "5%",
      key: "id",
    },
    {
      title: "Tên Phim",
      dataIndex: "nameFilm",
      width: "15%",
    },
    {
      title: "Cụm Rạp",
      dataIndex: "groupName",
      width: "10%",
    },
    {
      title: "Thuộc Rạp",
      dataIndex: "nameCinema",
      width: "15%",
    },
    {
      title: "Thuộc Phòng",
      dataIndex: "roomName",
      width: "15%",
    },
    {
      title: "Ngày Chiếu",
      dataIndex: "showDate",
      render: (text) => {
        return <p>{moment(text).format("DD/MM/YYYY hh:mm A")}</p>;
      },
      width: "10%",
    },
    {
      title: "Số Vé",
      dataIndex: "numberTicket",
      width: "10%",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      render: (text) => {
        return <p>{moment(text).format("YYYY//MM/DD hh:mm A")}</p>;
      },
      width: "10%",
    },
    {
      title: "",
      dataIndex: "id",
      render: (text, showTime) => {
        return (
          <div className="flex justify-around items-center text-lg">
            <NavLink
              className="hover:text-2xl hover:text-blue-400 text-black"
              to={`/Admin/ShowTimes/Edit/${showTime.id}`}
            >
              <EditOutlined key={1} className="cursor-pointer" />
            </NavLink>
            <div
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa Lịch Chiếu ? ")) {
                  dispatch(xoaLichChieuAction(showTime.id));
                }
              }}
              className="hover:text-2xl hover:text-red-400 text-black"
            >
              <DeleteOutlined key={2} className=" cursor-pointer" />
            </div>
          </div>
        );
      },
      width: "20%",
      key: "action",
    },
  ];
  const { Search } = Input;
  const onSearch = (value) => {
    dispatch(layDanhSachLichChieuAction(value));
  };
  return (
    <div className="mt-5">
      <h2 className="text-center my-4 text-2xl">QUẢN LÝ LỊCH CHIẾU</h2>
      <div className="my-3 mx-10 flex justify-between">
        <Button
          onClick={() => {
            history.push("/Admin/ShowTimes/Create");
          }}
        >
          <div className="text-base flex justify-center items-center">
            <PlusOutlined className="mr-2" />
            Thêm Lịch Chiếu
          </div>
        </Button>
        <Search
          placeholder="Nhập tên Phim để tìm lịch chiếu ?"
          enterButton="Search"
          onSearch={onSearch}
          style={{ width: 400 }}
        />
      </div>
      <p className="text-red-500 mx-5">
        * Nhấn 2 lần vào tên tên phim để xem người đặt với lịch chiếu{" "}
      </p>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              history.push(`/Admin/ShowTimes/userWithShowTime/${record.id}`);
            }, // double click row
          };
        }}
        columns={columns}
        dataSource={lstShowTime}
        rowKey="id"
      />
    </div>
  );
}
