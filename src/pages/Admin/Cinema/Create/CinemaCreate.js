import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { layDanhSachCumRapAction } from "../../../../redux/Actions/QuanLyCumRapAction";
import { themRapAction } from "../../../../redux/Actions/QuanLyRapChieuAction";
export default function CinemaCreate(props) {
  const dispatch = useDispatch();
  const { lstGroupCinemas } = useSelector((state) => state.QuanLyCumRapReducer);
  useEffect(() => {
    dispatch(layDanhSachCumRapAction());
  }, []);
  const [srcImg, setSrcImg] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      idGroupCinema: 0,
      address: "",
      logo: {},
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được trống !"),
      address: Yup.string().required("Không được trống !"),
      idGroupCinema: Yup.string().required("Không được trống !"),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      for (var key in values) {
        if (key !== "logo") {
          formData.append(key, values[key]);
        } else {
          formData.append("cinemas", values.logo, values.logo.name);
        }
      }
      dispatch(themRapAction(formData));
    },
  });
  function changeSelect(value) {
    formik.setFieldValue("idGroupCinema", value);
  }
  const handleFile = (e) => {
    // lấy file từ event
    const file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      // tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setSrcImg(e.target.result);
      };
      formik.setFieldValue("logo", file);
    }
  };
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
        initialValues={{
          size: "default",
        }}
        size="default"
      >
        <Form.Item label="Cụm Rạp">
          <Select
            placeholder="Chọn Cụm Rạp"
            name="idGroupCinema"
            onChange={changeSelect}
          >
            {lstGroupCinemas.map((group, index) => {
              return (
                <Select.Option key={index} value={group.id}>
                  {group.groupName}
                </Select.Option>
              );
            })}
          </Select>
          {formik.errors.idGroupCinema && formik.touched.idGroupCinema && (
            <p className="m-0 mt-1 text-red-600">
              {formik.errors.idGroupCinema}
            </p>
          )}
        </Form.Item>
        <Form.Item label="Tên Rạp">
          <Input name="name" onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.name}</p>
          )}
        </Form.Item>
        <Form.Item label="Đại Chỉ">
          <Input name="address" onChange={formik.handleChange} />
          {formik.errors.address && formik.touched.address && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.address}</p>
          )}
        </Form.Item>
        <Form.Item label="Ảnh">
          <input
            type="file"
            name="logo"
            onChange={handleFile}
            accept=".jpg, .jpeg, .png"
          />
          <br />
          <img
            style={{ width: 150, height: 150 }}
            src={srcImg}
            alt={`${srcImg}...`}
          />
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
