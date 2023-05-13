import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { CreateBannerAction } from "../../../../redux/Actions/BannerAction";
export default function CreateBanner() {
  const dispatch = useDispatch();
  const [srcImg, setSrcImg] = useState("");

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
      formik.setFieldValue("image", file);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: {},
    },
    validationSchema: Yup.object({
      // image: Yup.object.
    }),
    onSubmit: (values) => {
      if (!values.image.name) {
        alert("Bạn cần chọn ảnh ");
        return;
      }
      let formData = new FormData();
      for (var key in values) {
        formData.append("banner", values.image, values.image.name);
      }
      dispatch(CreateBannerAction(formData));
    },
  });
  return (
    <div>
      <h2 className="text-center my-4 text-2xl">Thêm Banner</h2>
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
        <Form.Item label="Ảnh">
          <input
            type="file"
            name="image"
            onChange={handleFile}
            accept=".jpg, .jpeg, .png"
          />
          {formik.errors.image && formik.touched.image && (
            <p className="m-0 mt-1 text-red-600">{formik.errors.image}</p>
          )}
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
