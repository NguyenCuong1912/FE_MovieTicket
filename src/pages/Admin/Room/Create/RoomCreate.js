import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { layDanhSachCumRapAction } from "../../../../redux/Actions/QuanLyCumRapAction";
import { quanLyRapChieuServices } from "../../../../services/QuanLyRapChieuServices";
import { themPhongAction } from "../../../../redux/Actions/QuanLyPhongAction";
import { roomSize } from "../../../../constants/roomSize";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
export default function RoomCreate(props) {
  const dispatch = useDispatch();
  const { lstGroupCinemas } = useSelector((state) => state.QuanLyCumRapReducer);
  useEffect(() => {
    dispatch(layDanhSachCumRapAction());
  }, []);
  const [state, setState] = useState({ lstRap: [] });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roomName: "",
      idCinema: "",
      maxSeat: 0,
      size: "",
    },
    validationSchema: Yup.object({
      roomName: Yup.string().required("Không được trống !"),
      idCinema: Yup.string().required("Không được trống !"),
      size: Yup.string().required("Không được trống !"),
    }),
    onSubmit: (values) => {
      dispatch(themPhongAction(values));
    },
  });
  const changeGroupCinema = async (value) => {
    const result = await quanLyRapChieuServices.layRapChieuTheoMaCumRap(value);
    if (result.status === 200) {
      formik.setFieldValue("idCinema", "");
      await setState({ ...state, lstRap: result.data });
    }
  };
  const changeCinema = (value) => {
    formik.setFieldValue("idCinema", value);
  };
  function onChangeSize(value) {
    const _size = roomSize.find((item) => item.size === value);
    formik.setFieldValue("maxSeat", _size.maxSeat);
    formik.setFieldValue("size", value);
  }
  return (
    <div>
      <h2 className="text-center my-4 text-2xl">Thêm Rạp Chiếu</h2>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // initialValues={{
        //   size: "default",
        // }}
        // size="default"
      >
        <Form.Item label="Cụm Rạp">
          <Select placeholder="Chọn Cụm Rạp" onChange={changeGroupCinema}>
            {lstGroupCinemas.map((group, index) => {
              return (
                <Select.Option key={index} value={group.id}>
                  {group.groupName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Rạp">
          <Select
            placeholder="Chọn Rạp"
            name="idCinema"
            onChange={changeCinema}
          >
            {state.lstRap?.map((cinema, index) => {
              return (
                <Select.Option key={index} value={cinema.id}>
                  {cinema.name}
                </Select.Option>
              );
            })}
          </Select>
          {formik.errors.idCinema && formik.touched.idCinema && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.idCinema}</p>
          )}
        </Form.Item>
        <Form.Item label="Tên Phòng">
          <Input name="roomName" onChange={formik.handleChange} />
          {formik.errors.roomName && formik.touched.roomName && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.roomName}</p>
          )}
        </Form.Item>
        <Form.Item label="Size">
          <Select placeholder="Loại phòng" name="size" onChange={onChangeSize}>
            {roomSize?.map((item, index) => {
              return (
                <Select.Option key={index} value={item.size}>
                  {`${item.size} - ${item.maxSeat} ghế`}
                </Select.Option>
              );
            })}
          </Select>
          <div className="mt-4 ">
            {formik.values.size !== "" ? (
              <NavLink
                exact
                to={`/Admin/Rooms/PreviewRoom?${formik.values.size}`}
                className="disabled:opacity-75"
              >
                Preview Room
              </NavLink>
            ) : (
              ""
            )}
          </div>
          {formik.errors.size && formik.touched.size && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.size}</p>
          )}
        </Form.Item>

        <div className="text-center ">
          <button
            className="border bg-sky-300 text-white border-white px-5 py-2 rounded"
            type="submit"
          >
            Thêm
          </button>
        </div>
      </Form>
    </div>
  );
}
