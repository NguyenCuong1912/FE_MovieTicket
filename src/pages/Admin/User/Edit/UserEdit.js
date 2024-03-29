import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  capNhatNguoiDungAction,
  layChiTietNguoiDungAction,
} from "../../../../redux/Actions/QuanLyNguoiDungAction";
import { LayDanhSachLoaiNguoiDungAction } from "./../../../../redux/Actions/QuanLyLoaiNguoiDungAction";
export default function UserEdit(props) {
  const dispatch = useDispatch();
  const { userEdit } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { lstType } = useSelector((state) => state.QuanLyLoaiNguoiDungReducer);
  useEffect(() => {
    const { id } = props.match.params;
    dispatch(LayDanhSachLoaiNguoiDungAction());
    dispatch(layChiTietNguoiDungAction(id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userEdit.email,
      phoneNumber: userEdit.phoneNumber,
      userName: userEdit?.userName,
      typeUser: userEdit?.type_user?.id,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Không được trống !")
        .email("Chưa đúng định dạng email"),
      phoneNumber: Yup.string()
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
          message: "Số điện thoại chưa đúng",
          excludeEmptyString: false,
        })
        .required("Không được trống !"),
      userName: Yup.string().required("Không được trống !"),
    }),
    onSubmit: (values) => {
      const { id } = props.match.params;
      dispatch(capNhatNguoiDungAction(id, values));
      console.log(values);
    },
  });
  return (
    <div className="mx-40">
      <h2 className="text-center text-xl">Sửa Thông Tin Tài Khoản</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
          </label>
          <input
            disabled
            name="email"
            value={formik.values.email}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.email}</p>
          )}
        </div>
        {/* UserName */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Họ Tên
          </label>
          <input
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.userName && formik.touched.userName && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.userName}</p>
          )}
        </div>
        {/* Phone */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Số Điện Thoại
          </label>
          <input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.phoneNumber}</p>
          )}
        </div>
        {/* Type User */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Loại Người Dùng
          </label>
          <select
            name="typeUser"
            value={formik.values.typeUser}
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {lstType.map((type, index) => {
              return (
                <option key={index} value={Number(type.id)}>
                  {type.nameType}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập Nhật
          </button>
        </div>
      </form>
    </div>
  );
}
