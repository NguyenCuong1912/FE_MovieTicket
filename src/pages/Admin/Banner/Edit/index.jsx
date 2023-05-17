import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailBannerAction } from "../../../../redux/Actions/BannerAction";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form } from "antd";
import { DOMAIN_STATIC_FILE } from "../../../../utils/Settings/config";
export default function EditBanner(props) {
  const { id } = props.match.params;
  const { detailBanner } = useSelector((state) => state.BannerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailBannerAction(id));
  }, []);
  console.log(detailBanner);
  //! Function
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
        alert("Bạn cần chọn ảnh để sửa  ");
        return;
      }
      let formData = new FormData();
      for (var key in values) {
        formData.append("banner", values.image, values.image.name);
      }
      // dispatch(CreateBannerAction(formData));
    },
  });
  return (
    <div>
      <h2 className="text-center my-4 text-2xl">Edit Banner</h2>
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
            style={{ width: 300, height: 150 }}
            src={
              srcImg === ""
                ? `${DOMAIN_STATIC_FILE}${detailBanner.image}`
                : srcImg
            }
            alt={`${srcImg}...`}
          />
        </Form.Item>
        <div className="text-center ">
          <button
            className="border bg-yellow-300 text-white border-white px-5 py-2 rounded"
            type="submit"
          >
            Edit
          </button>
        </div>
      </Form>
    </div>
  );
}
