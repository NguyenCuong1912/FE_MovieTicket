import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Select
} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { layDanhSachCumRapAction } from '../../../../redux/Actions/QuanLyCumRapAction';
import { capNhatRapChieuAction, chiTietRapAction } from '../../../../redux/Actions/QuanLyRapChieuAction';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { DOMAIN_STATIC_FILE } from '../../../../utils/Settings/config';
export default function CinemaEdit(props) {
    const dispatch = useDispatch();
    const { rapChieuEdit } = useSelector(state => state.QuanLyRapChieuReducer)
    const { lstGroupCinemas } = useSelector(state => state.QuanLyCumRapReducer);
    useEffect(() => {
        dispatch(layDanhSachCumRapAction());
        dispatch(chiTietRapAction(props.match.params.id))
    }, [])
    const [srcImg, setSrcImg] = useState('');
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: rapChieuEdit.name,
            idGroupCinema: rapChieuEdit.group?.id,
            address: rapChieuEdit.address,
            logo: null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Không được trống !"),
            address: Yup.string()
                .required("Không được trống !"),
            idGroupCinema: Yup.string()
                .required("Không được trống !"),
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            for (var key in values) {
                if (key !== 'logo') {
                    formData.append(key, values[key]);
                } else {
                    if (values.logo !== null)
                        formData.append('cinemas', values.logo, values.logo.name)
                }
            }
            dispatch(capNhatRapChieuAction(props.match.params.id, formData));
        },
    })
    function changeSelect(value) {
        formik.setFieldValue('idGroupCinema', value)
    }
    const handleFile = (e) => {
        // lấy file từ event
        const file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            // tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setSrcImg(e.target.result)
            }
            formik.setFieldValue('logo', file)
        }

    }
    return (
        <div>
            <h2 className='text-center my-4 text-2xl'>Thêm Rạp Chiếu</h2>
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
                    size: 'default',
                }}
                size='default'
            >
                <Form.Item label="Cụm Rạp">
                    <Select placeholder='Chọn Cụm Rạp' value={formik.values.idGroupCinema} name='idGroupCinema' onChange={changeSelect}>
                        {lstGroupCinemas.map((group, index) => {
                            return <Select.Option key={index} value={group.id}>{group.groupName}</Select.Option>
                        })}
                    </Select>
                    {formik.errors.idGroupCinema && formik.touched.idGroupCinema && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.idGroupCinema}</p>
                    )}
                </Form.Item>
                <Form.Item label="Tên Rạp">
                    <Input name='name' value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name && formik.touched.name && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.name}</p>
                    )}
                </Form.Item>
                <Form.Item label="Đại Chỉ">
                    <Input name='address' value={formik.values.address} onChange={formik.handleChange} />
                    {formik.errors.address && formik.touched.address && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.address}</p>
                    )}
                </Form.Item>
                <Form.Item label="Ảnh">
                    <input type='file' name='logo' onChange={handleFile} accept=".jpg, .jpeg, .png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={srcImg === '' ? `${DOMAIN_STATIC_FILE}${rapChieuEdit.logo}` : srcImg} alt={`${srcImg}...`} />
                </Form.Item>
                <div className='text-center '>
                    <button className='border bg-yellow-300 text-white border-white px-5 py-2 rounded' type='submit' >Cập nhật</button>
                </div>
            </Form>
        </div>
    )
}
