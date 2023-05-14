import React, { useEffect, useState } from "react";
import { quanLyNguoiDungServices } from "./../../../../services/QuanLyNguoiDungServices";
import { Table } from "antd";
export default function UserWithShowTime(props) {
  const [state, setState] = useState([]);
  console.log("data", state);
  const { id } = props.match.params;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const result = await quanLyNguoiDungServices.layNguoiDungTheoMaLichChieu(
        id
      );
      if (result.status === 200) {
        console.log(result.data);
        await setState(result.data.lstUser);
      }
    } catch (error) {}
  }, []);
  const columns = [
    {
      title: "Tên Người Dùng",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Số Vé Đặt",
      dataIndex: "numberTicket",
    },
  ];
  return (
    <div>
      <h3 className="text-center my-4 text-2xl">
        Danh Sách Người Dùng Đặt Vé Xem Với Lịch Chiếu {props.match.params.id}{" "}
      </h3>
      <Table dataSource={state} columns={columns} rowKey="email" />
    </div>
  );
}
