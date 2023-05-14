import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhongAction,
  chiTietPhongAction,
} from "../../../../redux/Actions/QuanLyPhongAction";
import { layDanhSachCumRapAction } from "../../../../redux/Actions/QuanLyCumRapAction";
import { quanLyRapChieuServices } from "../../../../services/QuanLyRapChieuServices";
import { Form, Input, Select, InputNumber } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { roomSize } from "../../../../constants/roomSize";
export default function RoomEdit(props) {
  const dispatch = useDispatch();
  const { phongEdit } = useSelector((state) => state.QuanLyPhongReducer);
  console.log(phongEdit);
  const { lstGroupCinemas } = useSelector((state) => state.QuanLyCumRapReducer);
  useEffect(() => {
    dispatch(chiTietPhongAction(props.match.params.id));
    dispatch(layDanhSachCumRapAction());
  }, []);
  const [state, setState] = useState({ lstRap: [] });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roomName: phongEdit.roomName,
      maxSeat: phongEdit.maxSeat,
      idCinema: phongEdit?.cinema_room?.id,
      size: phongEdit.size,
    },
    validationSchema: Yup.object({
      roomName: Yup.string().required("Không được trống !"),
      idCinema: Yup.string().required("Không được trống !"),
    }),
    onSubmit: (values) => {
      dispatch(capNhatPhongAction(props.match.params.id, values));
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
      <h2 className="text-center my-4 text-2xl">Sửa Rạp Chiếu</h2>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        size="default"
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
            defaultValue={phongEdit.cinema_room.name}
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
          <Input
            name="roomName"
            value={formik.values.roomName}
            onChange={formik.handleChange}
          />
          {formik.errors.roomName && formik.touched.roomName && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.roomName}</p>
          )}
        </Form.Item>
        <Form.Item label="Size">
          <Select
            placeholder="Chọn loại phòng"
            name="size"
            value={formik.values.size}
            defaultValue={phongEdit.size}
            onChange={onChangeSize}
          >
            {roomSize?.map((item, index) => {
              return (
                <Select.Option key={index} value={item.size}>
                  {`${item.size} - ${item.maxSeat} ghế`}
                </Select.Option>
              );
            })}
          </Select>
          {formik.errors.idCinema && formik.touched.idCinema && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.idCinema}</p>
          )}
        </Form.Item>

        <div className="text-center ">
          <button
            className="border bg-yellow-300 text-white border-white px-5 py-2 rounded"
            type="submit"
          >
            Cập nhật
          </button>
        </div>
      </Form>
    </div>
  );
}
