import React, { useState } from 'react';
import {
    Form,
    Input,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { themCumRapAction } from '../../../../redux/Actions/QuanLyCumRapAction';
export default function GroupCinemaCreate(props) {
    const [srcImg, setSrcImg] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            groupName: '',
            logo: {},
        },
        validationSchema: Yup.object({
            groupName: Yup.string()
                .required("Không được trống !"),
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            for (var key in values) {
                if (key !== 'logo') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('group_cinemas', values.logo, values.logo.name)
                }
            }
            dispatch(themCumRapAction(formData))

        },
    })
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
        <div className='my-10'>
            <h3 className='text-2xl text-center'>Thêm Cụm Rạp</h3>
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

                <Form.Item label="Tên Cụm Rạp">
                    <Input name='groupName' onChange={formik.handleChange} />
                    {formik.errors.groupName && formik.touched.groupName && (
                        <p className='m-0 mt-1 text-red-600'>{formik.errors.groupName}</p>
                    )}
                </Form.Item>
                <Form.Item label="Logo">
                    <input type='file' name='logo' onChange={handleFile}
                        accept=".jpg, .jpeg, .png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={srcImg} alt={`${srcImg}...`} />
                </Form.Item>
                <div className='text-center '>
                    <button className='border bg-sky-300 text-white border-white px-5 py-2 rounded' type='submit' >Thêm</button>
                </div>
            </Form>

        </div>
    )
}
