import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Input, Popconfirm } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import {
  layDanhSachnguoiDungAction,
  lockAndUnLockAction,
  xoaNguoiDungAction,
} from "./../../../redux/Actions/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import Export_Excel from "./../../../components/Excel/Export_Excel";
import {
  DeleteBannerAction,
  GetBannerAction,
} from "../../../redux/Actions/BannerAction";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
export default function Banner(props) {
  const { listUser } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { lstBanner } = useSelector((state) => state.BannerReducer);
  console.log("lst", lstBanner);
  const confirm = (id, status) => {
    if (status === "Unlock") {
      dispatch(lockAndUnLockAction(id, { isBlock: 0 }));
    } else {
      dispatch(lockAndUnLockAction(id, { isBlock: 1 }));
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBannerAction());
    dispatch(layDanhSachnguoiDungAction());
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
      title: "Banner",
      dataIndex: "image",
      render: (text, banner) => {
        return (
          <div
            style={{
              width: 100,
              height: 100,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${DOMAIN_STATIC_FILE}${banner.image})`,
            }}
          >
            <img
              style={{ width: 100, height: 100, opacity: 0 }}
              src={`${DOMAIN_STATIC_FILE}${banner.image}`}
              alt={banner.image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `https://picsum.photos/id/200/300`;
              }}
            />
          </div>
        );
      },
      width: "15%",
      key: "logo",
    },
    {
      title: "Hidden/Display",
      dataIndex: "isActive",
      render: (text, banner) => {
        if (banner.isActive) {
          return (
            <Popconfirm
              placement="top"
              title="Bạn có muốn cho banner này ẩn ?"
              onConfirm={() => {
                confirm(banner.id, "Unlock");
              }}
              okText="Yes"
              cancelText="No"
            >
              <div className="hover:text-green-500 cursor-pointer">
                <EyeOutlined style={{ fontSize: 20 }} />
              </div>
            </Popconfirm>
          );
        } else {
          return (
            <Popconfirm
              placement="top"
              title="Bạn có muốn hiện thị banner này ?"
              onConfirm={() => {
                confirm(banner.id, "lock");
              }}
              okText="Yes"
              cancelText="No"
            >
              <div className="hover:text-yellow-400 cursor-pointer">
                <EyeInvisibleOutlined style={{ fontSize: 20 }} />
              </div>
            </Popconfirm>
          );
        }
      },
      width: "10%",
    },
    {
      title: "",
      dataIndex: "id",
      width: "15%",
      render: (text, banner) => {
        return (
          <div className="flex justify-around items-center text-lg">
            <NavLink
              className="hover:text-2xl hover:text-blue-400 text-black"
              to={`/Admin/Banners/Edit/${banner.id}`}
            >
              <EditOutlined key={1} className="cursor-pointer" />
            </NavLink>
            <div
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa banner này ? ")) {
                  dispatch(DeleteBannerAction(banner.id));
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

  return (
    <Fragment>
      <h2 className="text-center my-4 text-2xl">QUẢN LÝ TÀI BANNER</h2>
      <div className="mx-10 mb-5 flex justify-between">
        <button
          onClick={() => {
            history.push("/Admin/Banners/Create");
          }}
          className="text-white bg-sky-500 flex items-center justify-center px-3 py-2"
        >
          <PlusOutlined />
          Thêm Banner
        </button>
      </div>
      <div className="mx-10">
        <Table columns={columns} dataSource={lstBanner} rowKey="id" />
      </div>
    </Fragment>
  );
}
